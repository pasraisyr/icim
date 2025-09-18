from icims_backend.models import Client, CustomUser, Payments, Classrooms
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from datetime import datetime

class ClientPaymentInput(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        inputs = request.data
        try:
            # Parse payment JSON string if present
            payment_raw = inputs.get('payment', '{}')
            if isinstance(payment_raw, str):
                import json
                payment_data = json.loads(payment_raw)
            else:
                payment_data = payment_raw

            # Create user (kalau dah ada IC sama, dia akan error)
            user = CustomUser.objects.create_user(
                username=inputs['studentIC'],
                first_name=inputs['first_name'],
                last_name=inputs['last_name'],
                password=inputs.get('password', 'defaultpassword'),
                user_type=4,
                is_staff=False,
                is_superuser=False
            )

            # Client - get_or_create
            client, created = Client.objects.get_or_create(
                admin=user,
                defaults={
                    "phone_number": inputs.get('phone_number'),
                    "status": "inactive",  
                    "address": inputs.get('address'),
                    "studentIC": inputs.get('studentIC'),
                    "guardianName": inputs.get('guardianName'),
                    "guardianIC": inputs.get('guardianIC'),
                    "guardianPhone": inputs.get('guardianPhone'),
                    "level": inputs.get('level'),
                    "enrollmentDate": datetime.strptime(
                        inputs['enrollmentDate'], '%Y-%m-%d'
                    ).date() if 'enrollmentDate' in inputs else None,
                    "registerar": "Self-Registered" 
                }
            )

            # Kalau client tu dah ada, update dengan data baru
            if not created:
                client.phone_number = inputs.get('phone_number')
                client.status = "inactive"  
                client.address = inputs.get('address')
                client.studentIC = inputs.get('studentIC')
                client.guardianName = inputs.get('guardianName')
                client.guardianIC = inputs.get('guardianIC')
                client.guardianPhone = inputs.get('guardianPhone')
                client.level = inputs.get('level')
                client.enrollmentDate = datetime.strptime(
                    inputs['enrollmentDate'], '%Y-%m-%d'
                ).date() if 'enrollmentDate' in inputs else None
                client.registerar = "Self-Registered"  
                client.save()

            # Create payment
            class_package = None
            if 'class_package' in payment_data and payment_data['class_package']:
                class_package = Classrooms.objects.get(id=payment_data['class_package'])

            # Get file from request.FILES
            payment_receipt = request.FILES.get('payment_receipt')

            payment = Payments.objects.create(
                student_id=client,
                class_package=class_package,
                payment_method=payment_data.get('payment_method'),
                payment_reference=payment_data.get('payment_reference'),
                payment_receipt=payment_receipt,
                selected_payments=payment_data.get('selected_payments', []),
                total_payment=payment_data.get('total_payment', 0.00),
            )

            return Response({
                "client": {
                    "id": client.id,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                    "email": user.email,
                    "phone_number": client.phone_number,
                    "address": client.address,
                    "status": client.status,
                    "studentIC": client.studentIC,
                    "guardianName": client.guardianName,
                    "guardianIC": client.guardianIC,
                    "guardianPhone": client.guardianPhone,
                    "level": client.level,
                    "enrollmentDate": client.enrollmentDate,
                    "registerar": client.registerar,
                    "updated_at": client.updated_at
                },
                "payment": {
                    "id": payment.id,
                    "student_id": payment.student_id.id,
                    "class_package": payment.class_package.id if payment.class_package else None,
                    "class_package_name": payment.class_package.name if payment.class_package else None,
                    "payment_method": payment.payment_method,
                    "payment_reference": payment.payment_reference,
                    "payment_receipt": payment.payment_receipt.url if payment.payment_receipt else None,
                    "selected_payments": payment.selected_payments,
                    "total_payment": float(payment.total_payment),
                    "submitted_at": payment.submitted_at,
                }
            }, status=status.HTTP_201_CREATED)

        except Exception as e:
            # Cleanup kalau ada error
            if 'client' in locals() and client is not None and not Payments.objects.filter(student_id=client).exists():
                client.delete()
            if 'user' in locals() and not Client.objects.filter(admin=user).exists():
                user.delete()
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class ClientPaymentEdit(APIView):
    permission_classes = [permissions.IsAdminUser]

    def put(self, request):
        inputs = request.data
        try:
            client_id = inputs.get('client_id')
            if not client_id:
                return Response({"error": "client_id is required"}, status=status.HTTP_400_BAD_REQUEST)
            client = Client.objects.get(id=client_id)
            client.status = "active"
            client.save()
            return Response({
                "id": client.id,
                "status": client.status,
                "updated_at": client.updated_at
            }, status=status.HTTP_200_OK)
        except Client.DoesNotExist:
            return Response({"error": "Client not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class ClientPaymentView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, client_id):
        try:
            client = Client.objects.get(id=client_id)
            user = client.admin
            payment = Payments.objects.filter(student_id=client).last()
            client_data = {
                "id": client.id,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "email": user.email,
                "phone_number": client.phone_number,
                "address": client.address,
                "status": client.status,
                "studentIC": client.studentIC,
                "guardianName": client.guardianName,
                "guardianIC": client.guardianIC,
                "guardianPhone": client.guardianPhone,
                "level": client.level,
                "enrollmentDate": client.enrollmentDate,
                "registerar": client.registerar,
                "updated_at": client.updated_at
            }
            payment_data = None
            if payment:
                payment_data = {
                    "id": payment.id,
                    "student_id": payment.student_id.id,
                    "class_package": payment.class_package.id if payment.class_package else None,
                    "class_package_name": payment.class_package.name if payment.class_package else None,
                    "payment_method": payment.payment_method,
                    "payment_reference": payment.payment_reference,
                    "payment_receipt": payment.payment_receipt.url if payment.payment_receipt else None,
                    "selected_payments": payment.selected_payments,
                    "total_payment": float(payment.total_payment),
                    "submitted_at": payment.submitted_at,
                }
            return Response({
                "client": client_data,
                "payment": payment_data
            }, status=status.HTTP_200_OK)
        except Client.DoesNotExist:
            return Response({"error": "Client not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class ClientPaymentListView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        clients = Client.objects.all()
        data = []
        for client in clients:
            user = client.admin
            payment = Payments.objects.filter(student_id=client).last()
            client_data = {
                "id": client.id,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "email": user.email,
                "phone_number": client.phone_number,
                "address": client.address,
                "status": client.status,
                "studentIC": client.studentIC,
                "guardianName": client.guardianName,
                "guardianIC": client.guardianIC,
                "guardianPhone": client.guardianPhone,
                "level": client.level,
                "enrollmentDate": client.enrollmentDate,
                "registerar": client.registerar,
                "updated_at": client.updated_at
            }
            payment_data = None
            if payment:
                payment_data = {
                    "id": payment.id,
                    "student_id": payment.student_id.id,
                    "class_package": payment.class_package.id if payment.class_package else None,
                    "class_package_name": payment.class_package.name if payment.class_package else None,
                    "payment_method": payment.payment_method,
                    "payment_reference": payment.payment_reference,
                    "payment_receipt": payment.payment_receipt.url if payment.payment_receipt else None,
                    "selected_payments": payment.selected_payments,
                    "total_payment": float(payment.total_payment),
                    "submitted_at": payment.submitted_at,
                }
            data.append({
                "client": client_data,
                "payment": payment_data
            })
        return Response(data, status=status.HTTP_200_OK)

class ClientPaymentDelete(APIView):
    permission_classes = [permissions.IsAdminUser]

    def delete(self, request, client_id):
        try:
            client = Client.objects.get(id=client_id)
            user = client.admin
            # Delete all payments for this client
            Payments.objects.filter(student_id=client).delete()
            client.delete()
            user.delete()
            return Response({"message": "Client and related payments deleted successfully"}, status=status.HTTP_200_OK)
        except Client.DoesNotExist:
            return Response({"error": "Client not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class ClientPaymentUpdate(APIView):
    permission_classes = [permissions.IsAdminUser]

    def put(self, request):
        inputs = request.data
        try:
            client_id = inputs.get('client_id')
            if not client_id:
                return Response({"error": "client_id is required"}, status=status.HTTP_400_BAD_REQUEST)
            client = Client.objects.get(id=client_id)
            # Update client fields if provided
            for field in [
                "phone_number", "address", "status", "studentIC", "guardianName",
                "guardianIC", "guardianPhone", "level", "enrollmentDate", "registerar"
            ]:
                if field in inputs:
                    setattr(client, field, inputs[field])
            if 'enrollmentDate' in inputs:
                client.enrollmentDate = datetime.strptime(inputs['enrollmentDate'], '%Y-%m-%d').date()
            client.save()
            return Response({
                "id": client.id,
                "status": client.status,
                "updated_at": client.updated_at
            }, status=status.HTTP_200_OK)
        except Client.DoesNotExist:
            return Response({"error": "Client not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
