from icims_backend.models import Staff, CustomUser, Classrooms, Subject, TeacherAllocation
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from datetime import datetime


class TeacherAllocationsView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        allocations = TeacherAllocation.objects.all()
        data = []
        try:
            for allocation in allocations:
                staff = Staff.objects.get(id=allocation.staff_id.id)
                user = CustomUser.objects.get(id=staff.admin.id)
                classroom = Classrooms.objects.get(id=allocation.classroom_id.id)
                subjects = allocation.subjects.all()
                data.append({
                    "id": allocation.id,
                    "teacher_name": f"{user.first_name} {user.last_name}",
                    "classroom": classroom.name,
                    "subjects": [subject.name for subject in subjects],
                    "updated_at": allocation.updated_at
                })
            return Response(data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class TeacherAllocationView(APIView):
    def get(self, request, allocation_id):
        allocation_id = request.query_params.get(id=allocation_id)
        if not allocation_id:
            return Response({"error": "Allocation ID is required"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            allocation = TeacherAllocation.objects.get(id=allocation_id)
            staff = Staff.objects.get(id=allocation.staff_id.id)
            user = CustomUser.objects.get(id=staff.admin.id)
            classroom = Classrooms.objects.get(id=allocation.classroom_id.id)
            subject = Subject.objects.get(id=allocation.subject_id.id)
            return Response({
                "id": allocation.id,
                "teacher_name": f"{user.first_name} {user.last_name}",
                "classroom": classroom.name,
                "subject": subject.name,
                "updated_at": allocation.updated_at
            }, status=status.HTTP_200_OK)
        except TeacherAllocation.DoesNotExist:
            return Response({"error": "Teacher allocation not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class TeacherAllocationInput(APIView):
    permission_classes = [permissions.IsAdminUser]

    def post(self, request):
        inputs = request.data
        try:
            staff = Staff.objects.get(id=inputs.get("staff_id"))
            classroom = Classrooms.objects.get(id=inputs.get("classroom_id"))
            subject_ids = inputs.get("subjects", [])
            allocation = TeacherAllocation.objects.create(
                staff_id=staff,
                classroom_id=classroom,
                updated_at=datetime.now()
            )
            if not isinstance(subject_ids, list):
                return Response({"error": "subjects must be a list of IDs"}, status=status.HTTP_400_BAD_REQUEST)
            subjects = Subject.objects.filter(id__in=subject_ids)
            allocation.subjects.set(subjects)
            allocation.save()
            return Response({"message": "Teacher allocation created successfully"}, status=status.HTTP_201_CREATED)
        except Staff.DoesNotExist:
            return Response({"error": "Staff not found"}, status=status.HTTP_404_NOT_FOUND)
        except Classrooms.DoesNotExist:
            return Response({"error": "Classroom not found"}, status=status.HTTP_404_NOT_FOUND)
        except Subject.DoesNotExist:
            return Response({"error": "Subject not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
class TeacherAllocationEdit(APIView):
    permission_classes = [permissions.IsAdminUser]

    def put(self, request):
        inputs = request.data
        allocation_id = inputs.get("id")
        if not allocation_id:
            return Response({"error": "Allocation ID is required"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            allocation = TeacherAllocation.objects.get(id=allocation_id)
            if "staff_id" in inputs:
                staff = Staff.objects.get(id=inputs.get("staff_id"))
                allocation.staff_id = staff
            if "classroom_id" in inputs:
                classroom = Classrooms.objects.get(id=inputs.get("classroom_id"))
                allocation.classroom_id = classroom
            if "subjects" in inputs:
                subject_ids = inputs.get("subjects", [])
                if not isinstance(subject_ids, list):
                    return Response({"error": "subjects must be a list of IDs"}, status=status.HTTP_400_BAD_REQUEST)
                subjects = Subject.objects.filter(id__in=subject_ids)
                allocation.subjects.set(subjects)
            allocation.updated_at = datetime.now()
            allocation.save()
            return Response({"message": "Teacher allocation updated successfully"}, status=status.HTTP_200_OK)
        except TeacherAllocation.DoesNotExist:
            return Response({"error": "Teacher allocation not found"}, status=status.HTTP_404_NOT_FOUND)
        except Staff.DoesNotExist:
            return Response({"error": "Staff not found"}, status=status.HTTP_404_NOT_FOUND)
        except Classrooms.DoesNotExist:
            return Response({"error": "Classroom not found"}, status=status.HTTP_404_NOT_FOUND)
        except Subject.DoesNotExist:
            return Response({"error": "Subject not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class TeacherAllocationDelete(APIView):
    permission_classes = [permissions.IsAdminUser]

    def delete(self, request):
        allocation_id = request.data.get("id")
        if not allocation_id:
            return Response({"error": "Allocation ID is required"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            allocation = TeacherAllocation.objects.get(id=allocation_id)
            allocation.delete()
            return Response({"message": "Teacher allocation deleted successfully"}, status=status.HTTP_200_OK)
        except TeacherAllocation.DoesNotExist:
            return Response({"error": "Teacher allocation not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)