from icims_backend.models import Staff, CustomUser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from datetime import datetime

class StaffsView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        staffs = Staff.objects.all()
        data = []
        try:
            for staff in staffs:
                user = CustomUser.objects.get(id=staff.admin.id)
                data.append({
                    "id": staff.id,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                    "email": user.email,
                    "phone_number": staff.phone_number,
                    "status": staff.status,
                    "position": staff.position,
                    "joinDate": staff.joinDate,
                    "updated_at": staff.updated_at
                })
            return Response(data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class StaffView(APIView):
    def get(self, request, staff_id):
        staff_id = request.query_params.get(id=staff_id)
        if not staff_id:
            return Response({"error": "Staff ID is required"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            staff = Staff.objects.get(id=staff_id)
            user = CustomUser.objects.get(id=staff.admin.id)
            return Response({
                "id": staff.id,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "email": user.email,
                "phone_number": staff.phone_number,
                "status": staff.status,
                "updated_at": staff.updated_at
            }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
class StaffInput(APIView):
    permission_classes = [permissions.IsAdminUser]

    def post(self, request):
        inputs = request.data
        try:
            # Create CustomUser first with user_type=2 for Staff
            user = CustomUser.objects.create_user(
                username=inputs['email'],
                email=inputs['email'],
                first_name=inputs['first_name'],
                last_name=inputs['last_name'],
                password=inputs['password'],
                user_type=2  # This will trigger the signal to create Staff
            )

            # Get the staff object created by signal
            staff = Staff.objects.get(admin=user)
            
            # Update the staff object with additional fields
            join_date = None
            if 'joinDate' in inputs:
                join_date = datetime.strptime(inputs['joinDate'], '%Y-%m-%d').date()

            staff.phone_number = inputs.get('phone_number', '')
            staff.status = inputs.get('status', 'active')
            staff.position = inputs['position']
            staff.joinDate = join_date
            staff.save()

            return Response({
                "id": staff.id,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "email": user.email,
                "phone_number": staff.phone_number,
                "status": staff.status,
                "position": staff.position,
                "joinDate": staff.joinDate,
                "updated_at": staff.updated_at
            }, status=status.HTTP_201_CREATED)
        except Exception as e:
            # If something goes wrong, cleanup
            if 'user' in locals():
                user.delete()
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class StaffEdit(APIView):
    permission_classes = [permissions.IsAdminUser]

    def put(self, request):
        inputs = request.data
        try:
            staff = Staff.objects.get(id=inputs['id'])
            user = CustomUser.objects.get(id=staff.admin.id)

            # Update CustomUser fields
            if 'first_name' in inputs:
                user.first_name = inputs['first_name']
            if 'last_name' in inputs:
                user.last_name = inputs['last_name']
            if 'email' in inputs:
                user.email = inputs['email']
                user.username = inputs['email']
            if 'password' in inputs:
                user.set_password(inputs['password'])
            user.save()

            # Update Staff fields
            if 'phone_number' in inputs:
                staff.phone_number = inputs['phone_number']
            if 'address' in inputs:
                staff.address = inputs['address']
            if 'status' in inputs:
                staff.status = inputs['status']
            if 'position' in inputs:
                staff.position = inputs['position']
            if 'joinDate' in inputs:
                staff.joinDate = datetime.strptime(inputs['joinDate'], '%Y-%m-%d').date()
            
            staff.save()

            return Response({
                "id": staff.id,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "email": user.email,
                "phone_number": staff.phone_number,
                "status": staff.status,
                "position": staff.position,
                "joinDate": staff.joinDate,
                "updated_at": staff.updated_at
            }, status=status.HTTP_200_OK)
        except Staff.DoesNotExist:
            return Response({"error": "Staff not found"}, status=status.HTTP_404_NOT_FOUND)
        except ValueError as e:
            return Response({"error": "Invalid date format"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
class StaffDelete(APIView):
    permission_classes = [permissions.IsAdminUser]

    def delete(self, request):
        try:
            inputs = request.data
            staff_id = inputs.get('id')
            if not staff_id:
                return Response({"error": "Staff ID is required"}, status=status.HTTP_400_BAD_REQUEST)

            staff = Staff.objects.get(id=staff_id)
            user = CustomUser.objects.get(id=staff.admin.id)

            # Delete Staff and associated CustomUser
            staff.delete()
            user.delete()

            return Response({"status": "success"}, status=status.HTTP_200_OK)
        except Staff.DoesNotExist:
            return Response({"error": "Staff not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)