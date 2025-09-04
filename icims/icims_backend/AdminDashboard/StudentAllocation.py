from icims_backend.models import StudentAllocation, Client, Classrooms
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions


class StudentAllocationsView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def get(self, request):
        allocations = StudentAllocation.objects.all()
        data = []
        try:
            for allocation in allocations:
                data.append({
                    "id": allocation.id,
                    "student_id": allocation.student_id.id,
                    "student_name": f"{allocation.student_id.admin.first_name} {allocation.student_id.admin.last_name}",
                    "student_email": allocation.student_id.admin.email,
                    "classroom_id": allocation.classroom_id.id,
                    "classroom_name": allocation.classroom_id.name,
                    "updated_at": allocation.updated_at
                })
            return Response(data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class StudentAllocationView(APIView):
    permission_classes = [permissions.IsAdminUser]
    
    def get(self, request, allocation_id):
        if not allocation_id:
            return Response({"error": "Allocation ID is required"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            allocation = StudentAllocation.objects.get(id=allocation_id)
            return Response({
                "id": allocation.id,
                "student_id": allocation.student_id.id,
                "student_name": f"{allocation.student_id.admin.first_name} {allocation.student_id.admin.last_name}",
                "student_email": allocation.student_id.admin.email,
                "classroom_id": allocation.classroom_id.id,
                "classroom_name": allocation.classroom_id.name,
                "updated_at": allocation.updated_at
            }, status=status.HTTP_200_OK)
        except StudentAllocation.DoesNotExist:
            return Response({"error": "Student allocation not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class StudentAllocationInput(APIView):
    permission_classes = [permissions.IsAdminUser]

    def post(self, request):
        inputs = request.data
        try:
            # Check if required fields are present
            if 'student_id' not in inputs:
                return Response({"error": "student_id is required"}, status=status.HTTP_400_BAD_REQUEST)
            if 'classroom_id' not in inputs:
                return Response({"error": "classroom_id is required"}, status=status.HTTP_400_BAD_REQUEST)
            
            # Validate student exists
            student = Client.objects.get(id=inputs['student_id'])
            
            # Validate classroom exists
            classroom = Classrooms.objects.get(id=inputs['classroom_id'])
            
            # Check if allocation already exists
            existing_allocation = StudentAllocation.objects.filter(
                student_id=student,
                classroom_id=classroom
            ).first()
            
            if existing_allocation:
                return Response({"error": "Student is already allocated to this classroom"}, status=status.HTTP_400_BAD_REQUEST)

            # Create student allocation
            allocation = StudentAllocation.objects.create(
                student_id=student,
                classroom_id=classroom
            )

            return Response({
                "id": allocation.id,
                "student_id": allocation.student_id.id,
                "student_name": f"{allocation.student_id.admin.first_name} {allocation.student_id.admin.last_name}",
                "student_email": allocation.student_id.admin.email,
                "classroom_id": allocation.classroom_id.id,
                "classroom_name": allocation.classroom_id.name,
                "updated_at": allocation.updated_at
            }, status=status.HTTP_201_CREATED)
        except Client.DoesNotExist:
            return Response({"error": "Student not found"}, status=status.HTTP_404_NOT_FOUND)
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
            
            # Update student if provided
            if 'student_id' in inputs:
                student = Client.objects.get(id=inputs['student_id'])
                allocation.student_id = student
            
            # Update classroom if provided
            if 'classroom_id' in inputs:
                classroom = Classrooms.objects.get(id=inputs['classroom_id'])
                allocation.classroom_id = classroom
            
            allocation.save()

            return Response({
                "id": allocation.id,
                "student_id": allocation.student_id.id,
                "student_name": f"{allocation.student_id.admin.first_name} {allocation.student_id.admin.last_name}",
                "student_email": allocation.student_id.admin.email,
                "classroom_id": allocation.classroom_id.id,
                "classroom_name": allocation.classroom_id.name,
                "updated_at": allocation.updated_at
            }, status=status.HTTP_200_OK)
        except StudentAllocation.DoesNotExist:
            return Response({"error": "Student allocation not found"}, status=status.HTTP_404_NOT_FOUND)
        except Client.DoesNotExist:
            return Response({"error": "Student not found"}, status=status.HTTP_404_NOT_FOUND)
        except Classrooms.DoesNotExist:
            return Response({"error": "Classroom not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class StudentAllocationDelete(APIView):
    permission_classes = [permissions.IsAdminUser]

    def delete(self, request):
        try:
            inputs = request.data
            allocation_id = inputs.get('id')
            if not allocation_id:
                return Response({"error": "Allocation ID is required"}, status=status.HTTP_400_BAD_REQUEST)

            allocation = StudentAllocation.objects.get(id=allocation_id)
            allocation.delete()

            return Response({"message": "Student allocation deleted successfully"}, status=status.HTTP_200_OK)
        except StudentAllocation.DoesNotExist:
            return Response({"error": "Student allocation not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)