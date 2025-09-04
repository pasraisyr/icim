from icims_backend.models import Client, CustomUser, Classrooms, StudentAllocation
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from datetime import datetime


class StudentAllocationsView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def get(self, request):
        allocations = StudentAllocation.objects.all()
        data = []
        try:
            for allocation in allocations:
                data.append(self._format_allocation_data(allocation))
            return Response(data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def _format_allocation_data(self, allocation):
        client = Client.objects.get(id=allocation.student_id.id)
        user = CustomUser.objects.get(id=client.admin.id)
        classroom = Classrooms.objects.get(id=allocation.classroom_id.id)
        return {
            "id": allocation.id,
            "student_id": client.id,
            "student_name": f"{user.first_name} {user.last_name}",
            "classroom_id": classroom.id,
            "classroom_name": classroom.name,
            "updated_at": allocation.updated_at
        }

class StudentAllocationView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def get(self, request, allocation_id):
        try:
            allocation = StudentAllocation.objects.get(id=allocation_id)
            data = StudentAllocationsView._format_allocation_data(self, allocation)
            return Response(data, status=status.HTTP_200_OK)
        except StudentAllocation.DoesNotExist:
            return Response({"error": "Student allocation not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class StudentAllocationInput(APIView):
    permission_classes = [permissions.IsAdminUser]

    def post(self, request):
        inputs = request.data
        try:
            client = Client.objects.get(id=inputs.get("client_id"))
            classroom = Classrooms.objects.get(id=inputs.get("classroom_id"))

            allocation = StudentAllocation.objects.create(
                student_id=client,
                classroom_id=classroom
            )

            data = StudentAllocationsView._format_allocation_data(self, allocation)
            return Response(data, status=status.HTTP_201_CREATED)
        except Client.DoesNotExist:
            return Response({"error": "Client not found"}, status=status.HTTP_404_NOT_FOUND)
        except Classrooms.DoesNotExist:
            return Response({"error": "Classroom not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class StudentAllocationEdit(APIView):
    permission_classes = [permissions.IsAdminUser]

    def put(self, request):
        inputs = request.data
        try:
            allocation = StudentAllocation.objects.get(id=inputs['id'])
            
            if 'client_id' in inputs:
                client = Client.objects.get(id=inputs['client_id'])
                allocation.student_id = client
            if 'classroom_id' in inputs:
                classroom = Classrooms.objects.get(id=inputs['classroom_id'])
                allocation.classroom_id = classroom
            
            allocation.save()

            data = StudentAllocationsView._format_allocation_data(self, allocation)
            return Response(data, status=status.HTTP_200_OK)
        except StudentAllocation.DoesNotExist:
            return Response({"error": "Student allocation not found"}, status=status.HTTP_404_NOT_FOUND)
        except Client.DoesNotExist:
            return Response({"error": "Client not found"}, status=status.HTTP_404_NOT_FOUND)
        except Classrooms.DoesNotExist:
            return Response({"error": "Classroom not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class StudentAllocationDelete(APIView):
    permission_classes = [permissions.IsAdminUser]

    def delete(self, request):
        allocation_id = request.data.get('id')
        if not allocation_id:
            return Response({"error": "Allocation ID is required"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            allocation = StudentAllocation.objects.get(id=allocation_id)
            allocation.delete()
            return Response({"message": "Student allocation deleted successfully"}, status=status.HTTP_200_OK)
        except StudentAllocation.DoesNotExist:
            return Response({"error": "Student allocation not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)