from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from icims_backend.models import TeacherAllocation, Staff, Classrooms, Subject, StudentAllocation

class GetClassDetails(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, class_id):
        try:
            staff = Staff.objects.get(admin=request.user)
            allocation = TeacherAllocation.objects.filter(staff_id=staff, classroom_id=class_id).first()
            if not allocation:
                return Response({"error": "You are not allocated to this class."}, status=status.HTTP_403_FORBIDDEN)
            
            classroom = allocation.classroom_id
            subjects = [subject.name for subject in allocation.subjects.all()]
            # Count students in this class
            students_count = StudentAllocation.objects.filter(classroom_id=classroom).count()

            data = {
                "id": classroom.id,
                "name": classroom.name,
                "level": classroom.level,
                "scheduleDay": classroom.scheduleDay,
                "startTime": classroom.startTime,
                "endTime": classroom.endTime,
                "price": classroom.price,
                "status": classroom.statuse,
                "subjects": subjects,
                "students_count": students_count,  # <-- Make sure this is included!
            }
            return Response(data, status=status.HTTP_200_OK)
        except Staff.DoesNotExist:
            return Response({"error": "Staff profile not found."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)