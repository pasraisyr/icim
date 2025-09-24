from icims_backend.models import Client, CustomUser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from datetime import datetime

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
                    "registerar": client.registerar,
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
                "registerar": client.registerar,
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
            user = CustomUser.objects.create_user(
                username=inputs['studentIC'],
                first_name=inputs['first_name'],
                last_name=inputs['last_name'],
                password=inputs.get('password', 'defaultpassword'),
                user_type=4,
                is_staff=False,
                is_superuser=False
            )
            registerar = "admin"
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
            client.enrollmentDate = datetime.strptime(inputs['enrollmentDate'], '%Y-%m-%d').date() if 'enrollmentDate' in inputs else None
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
                "registerar": client.registerar,
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
            if 'first_name' in inputs:
                user.first_name = inputs['first_name']
            if 'last_name' in inputs:
                user.last_name = inputs['last_name']
            if 'email' in inputs:
                user.email = inputs['email']
            user.save()
            fields = [
                'phone_number', 'address', 'status', 'studentIC', 
                'guardianName', 'guardianIC', 'guardianPhone', 'level'
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
                "registerar": client.registerar,
                "updated_at": client.updated_at
            }, status=status.HTTP_200_OK)
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
            user = CustomUser.objects.get(id=client.admin.id)
            client.delete()
            user.delete()
            return Response({"message": "Client deleted successfully"}, status=status.HTTP_200_OK)
        except Client.DoesNotExist:
            return Response({"error": "Client not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


