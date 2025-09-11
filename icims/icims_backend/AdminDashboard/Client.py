from icims_backend.models import Client, CustomUser, Payments, StudentAllocation
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from datetime import datetime
import json

def get_payment_details(client):
    """Helper function to get payment history for a client"""
    payments = Payments.objects.filter(student_id=client).order_by('-payment_date')
    return [{
        "id": payment.id,
        "amount": payment.amount,
        "payment_reference": payment.payment_reference,
        "payment_date": payment.payment_date,
        "payment_method": payment.payment_method,
        "receipt": payment.receipt.url if payment.receipt else None,
        "updated_at": payment.updated_at
    } for payment in payments]

class ClientsView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        clients = Client.objects.all()
        data = []
        try:
            for client in clients:
                user = CustomUser.objects.get(id=client.admin.id)
                client_data = {
                    "id": client.id,
                    "username": user.username,
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
                    "class_method": client.class_method,
                    "total_fees": client.total_fees,
                    "outstanding_fees": client.outstanding_fees,
                    "payments": get_payment_details(client),
                    "updated_at": client.updated_at
                }
                data.append(client_data)
            return Response(data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class ClientView(APIView):
    permission_classes = [permissions.IsAdminUser]
    
    def get(self, request, client_id):
        if not client_id:
            return Response({"error": "Client ID is required"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            client = Client.objects.get(id=client_id)
            user = CustomUser.objects.get(id=client.admin.id)
            return Response({
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
                "class_method": client.class_method,
                "total_fees": client.total_fees,
                "outstanding_fees": client.outstanding_fees,
                "payments": get_payment_details(client),
                "updated_at": client.updated_at
            }, status=status.HTTP_200_OK)
        except Client.DoesNotExist:
            return Response({"error": "Client not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class ClientInput(APIView):
    permission_classes = [permissions.IsAdminUser]

    def post(self, request):
        inputs = request.data
        try:
            # Create CustomUser
            user = CustomUser.objects.create_user(
                username=inputs['studentIC'],
                first_name=inputs['first_name'],
                last_name=inputs['last_name'],
                password=inputs.get('password', 'defaultpassword'),
                user_type=4,  # Client type
                is_staff=False,
                is_superuser=False
            )

            # Calculate total and outstanding fees
            total_fees = float(inputs.get('total_fees', 0))
            initial_payment = float(inputs.get('initial_payment', 0))
            outstanding_fees = total_fees - initial_payment
            registerar = "admin"
            # Create Client
            client = Client.objects.get(admin=user)
            client.registerar = registerar
            client.phone_number = inputs.get('phone_number')
            client.status = inputs.get('status', 'active')
            client.address = inputs.get('address')
            client.studentIC = inputs.get('studentIC')
            client.guardianName = inputs.get('guardianName')
            client.guardianIC = inputs.get('guardianIC')
            client.guardianPhone = inputs.get('guardianPhone')
            client.level = inputs.get('level')
            client.class_method = inputs.get('class_method')
            client.total_fees = total_fees
            client.outstanding_fees = outstanding_fees
            client.enrollmentDate = datetime.strptime(inputs['enrollmentDate'], '%Y-%m-%d').date() if 'enrollmentDate' in inputs else None
            client.save()
            # Create initial payment(s) if provided
            # This can be one or it might be multiple payments
            payments_data = inputs.get('payments', [])
            
            # Handle legacy single payment format for backward compatibility
            if initial_payment > 0 and not payments_data:
                payments_data = [{
                    'amount': initial_payment,
                    'payment_reference': inputs.get('payment_reference'),
                    'payment_method': inputs.get('payment_method'),
                    'receipt': request.FILES.get('receipt')
                }]
            
            # Create multiple payments
            for payment_data in payments_data:
                payment_amount = float(payment_data.get('amount', 0))
                if payment_amount > 0:
                    payment = Payments.objects.create(
                        student_id=client,
                        amount=payment_amount,
                        payment_reference=payment_data.get('payment_reference'),
                        payment_method=payment_data.get('payment_method'),
                        receipt=payment_data.get('receipt')
                    )

            return Response({
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
                "class_method": client.class_method,
                "total_fees": client.total_fees,
                "outstanding_fees": client.outstanding_fees,
                "payments": get_payment_details(client),
                "updated_at": client.updated_at
            }, status=status.HTTP_201_CREATED)
        except Exception as e:
            if 'user' in locals():
                user.delete()
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class ClientEdit(APIView):
    permission_classes = [permissions.IsAdminUser]

    def put(self, request):
        inputs = request.data
        try:
            client = Client.objects.get(id=inputs['id'])
            user = CustomUser.objects.get(id=client.admin.id)

            # Update CustomUser fields
            if 'first_name' in inputs:
                user.first_name = inputs['first_name']
            if 'last_name' in inputs:
                user.last_name = inputs['last_name']
            if 'email' in inputs:
                user.email = inputs['email']
            user.save()

            # Update Client fields
            fields = [
                'phone_number', 'address', 'status', 'studentIC', 
                'guardianName', 'guardianIC', 'guardianPhone', 'level',
                'class_method', 'total_fees'
            ]

            for field in fields:
                if field in inputs:
                    setattr(client, field, inputs[field])

            if 'enrollmentDate' in inputs:
                client.enrollmentDate = datetime.strptime(inputs['enrollmentDate'], '%Y-%m-%d').date()

            client.save()

            return Response({
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
                "class_method": client.class_method,
                "total_fees": client.total_fees,
                "outstanding_fees": client.outstanding_fees,
                "payments": get_payment_details(client),
                "updated_at": client.updated_at
            }, status=status.HTTP_200_OK)
        except Client.DoesNotExist:
            return Response({"error": "Client not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class ClientPayment(APIView):
    permission_classes = [permissions.IsAdminUser]

    def post(self, request):
        inputs = request.data
        try:
            client = Client.objects.get(id=inputs['client_id'])
            payment_amount = float(inputs['amount'])

            # Create new payment
            payment = Payments.objects.create(
                student_id=client,
                amount=payment_amount,
                payment_reference=inputs.get('payment_reference'),
                payment_method=inputs['payment_method'],
                receipt=request.FILES.get('receipt')
            )

            # Update outstanding fees
            client.outstanding_fees = float(client.outstanding_fees) - payment_amount
            client.save()

            return Response({
                "payment": {
                    "id": payment.id,
                    "amount": payment.amount,
                    "payment_reference": payment.payment_reference,
                    "payment_date": payment.payment_date,
                    "payment_method": payment.payment_method,
                    "receipt": payment.receipt.url if payment.receipt else None,
                    "updated_at": payment.updated_at
                },
                "outstanding_fees": client.outstanding_fees
            }, status=status.HTTP_201_CREATED)
        except Client.DoesNotExist:
            return Response({"error": "Client not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class ClientPaymentView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def get(self, request, client_id=None):
        try:
            if client_id:
                client = Client.objects.get(id=client_id)
                payments = Payments.objects.filter(student_id=client).order_by('-payment_date')
                payment_list = [{
                    "id": payment.id,
                    "amount": payment.amount,
                    "payment_reference": payment.payment_reference,
                    "payment_date": payment.payment_date,
                    "payment_method": payment.payment_method,
                    "receipt": payment.receipt.url if payment.receipt else None,
                    "updated_at": payment.updated_at
                } for payment in payments]
                return Response({
                    "client_id": client.id,
                    "studentIC": client.studentIC,
                    "payments": payment_list,
                    "outstanding_fees": client.outstanding_fees
                }, status=status.HTTP_200_OK)
            else:
                payments = Payments.objects.all().order_by('-payment_date')
                payment_list = [{
                    "id": payment.id,
                    "student_id": payment.student_id.id if payment.student_id else None,
                    "amount": payment.amount,
                    "payment_reference": payment.payment_reference,
                    "payment_date": payment.payment_date,
                    "payment_method": payment.payment_method,
                    "receipt": payment.receipt.url if payment.receipt else None,
                    "updated_at": payment.updated_at
                } for payment in payments]
                return Response({"payments": payment_list}, status=status.HTTP_200_OK)
        except Client.DoesNotExist:
            return Response({"error": "Client not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class ClientDelete(APIView):
    permission_classes = [permissions.IsAdminUser]

    def delete(self, request, client_id):
        if not client_id:
            return Response({"error": "Client ID is required"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            client = Client.objects.get(id=client_id)
            
            # Check for associated records
            payments = Payments.objects.filter(student_id=client)
            allocations = StudentAllocation.objects.filter(student_id=client)
            
            # Return warning if client has payments or allocations
            if payments.exists() or allocations.exists():
                return Response({
                    "warning": "Client has associated payments or class allocations",
                    "payments_count": payments.count(),
                    "allocations_count": allocations.count()
                }, status=status.HTTP_409_CONFLICT)
            
            # Proceed with deletion
            user = CustomUser.objects.get(id=client.admin.id)
            client.delete()
            user.delete()
            return Response({"message": "Client deleted successfully"}, status=status.HTTP_200_OK)
        except Client.DoesNotExist:
            return Response({"error": "Client not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        

