from icims_backend.models import Client, CustomUser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from datetime import datetime
import json

class ClientsView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def get(self, request):
        clients = Client.objects.all()
        data = []
        try:
            for client in clients:
                user = CustomUser.objects.get(id=client.admin.id)
                data.append({
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
                    "payment_method": client.payment_method,
                    "payment_receipt": client.payment_receipt.url if client.payment_receipt else None,
                    "selected_payment": client.selected_payment,
                    "total_payment": client.total_payment,
                    "current_payments": client.current_payments,
                    "updated_at": client.updated_at
                })
            return Response(data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class ClientView(APIView):
    def get(self, request, client_id):
        client_id = request.query_params.get(id=client_id)
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
                "payment_method": client.payment_method,
                "payment_receipt": client.payment_receipt.url if client.payment_receipt else None,
                "selected_payment": client.selected_payment,
                "total_payment": client.total_payment,
                "current_payments": client.current_payments,
                "updated_at": client.updated_at
            }, status=status.HTTP_200_OK)
        except Client.DoesNotExist:
            return Response({"error": "Client not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class ClientEdit(APIView):
    permission_classes = [permissions.IsAdminUser]

    def put(self, request):
        inputs = request.data
        try:
            client_id = inputs['id']
            obj = Client.objects.get(id=client_id)
            user = CustomUser.objects.get(id=obj.admin.id)

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
                'class_method', 'payment_method', 'selected_payment',
                'total_payment', 'current_payments'
            ]

            for field in fields:
                if field in inputs:
                    setattr(obj, field, inputs[field])

            if 'enrollmentDate' in inputs:
                obj.enrollmentDate = datetime.strptime(inputs['enrollmentDate'], '%Y-%m-%d').date()

            if 'payment_receipt' in request.FILES:
                obj.payment_receipt = request.FILES['payment_receipt']

            obj.save()

            return Response({
                "id": obj.id,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "email": user.email,
                "phone_number": obj.phone_number,
                "address": obj.address,
                "status": obj.status,
                "studentIC": obj.studentIC,
                "guardianName": obj.guardianName,
                "guardianIC": obj.guardianIC,
                "guardianPhone": obj.guardianPhone,
                "level": obj.level,
                "enrollmentDate": obj.enrollmentDate,
                "class_method": obj.class_method,
                "payment_method": obj.payment_method,
                "payment_receipt": obj.payment_receipt.url if obj.payment_receipt else None,
                "selected_payment": obj.selected_payment,
                "total_payment": obj.total_payment,
                "current_payments": obj.current_payments,
                "updated_at": obj.updated_at
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
            # Required CustomUser fields
            user = CustomUser.objects.create_user(
                email=inputs['email'],
                first_name=inputs['first_name'],
                last_name=inputs['last_name'],
                password=inputs.get('password', 'defaultpassword'),
                is_staff=False,
                is_superuser=False
            )

            # Create Client with all possible fields
            client_data = {
                'admin': user,
                'phone_number': inputs.get('phone_number'),
                'status': inputs.get('status', 'active'),
                'address': inputs.get('address'),
                'studentIC': inputs.get('studentIC'),
                'guardianName': inputs.get('guardianName'),
                'guardianIC': inputs.get('guardianIC'),
                'guardianPhone': inputs.get('guardianPhone'),
                'level': inputs.get('level'),
                'class_method': inputs.get('class_method'),
                'payment_method': inputs.get('payment_method'),
                'selected_payment': inputs.get('selected_payment'),
                'total_payment': inputs.get('total_payment', 0),
                'current_payments': inputs.get('current_payments')
            }

            if 'enrollmentDate' in inputs:
                client_data['enrollmentDate'] = datetime.strptime(inputs['enrollmentDate'], '%Y-%m-%d').date()

            if 'payment_receipt' in request.FILES:
                client_data['payment_receipt'] = request.FILES['payment_receipt']

            obj = Client.objects.create(**client_data)

            return Response({
                "id": obj.id,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "email": user.email,
                "phone_number": obj.phone_number,
                "address": obj.address,
                "status": obj.status,
                "studentIC": obj.studentIC,
                "guardianName": obj.guardianName,
                "guardianIC": obj.guardianIC,
                "guardianPhone": obj.guardianPhone,
                "level": obj.level,
                "enrollmentDate": obj.enrollmentDate,
                "class_method": obj.class_method,
                "payment_method": obj.payment_method,
                "payment_receipt": obj.payment_receipt.url if obj.payment_receipt else None,
                "selected_payment": obj.selected_payment,
                "total_payment": obj.total_payment,
                "current_payments": obj.current_payments,
                "updated_at": obj.updated_at
            }, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class ClientDelete(APIView):
    permission_classes = [permissions.IsAdminUser]

    def delete(self, request, client_id):
        client_id = request.query_params.get(id=client_id)
        if not client_id:
            return Response({"error": "Client ID is required"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            client = Client.objects.get(id=client_id)
            user = CustomUser.objects.get(id=client.admin.id)
            client.delete()
            user.delete()
            return Response({"message": "Client deleted successfully"}, status=status.HTTP_200_OK)
        except Client.DoesNotExist:
            return Response({"error": "Client not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)