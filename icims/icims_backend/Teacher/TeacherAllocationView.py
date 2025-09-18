from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from icims_backend.models import TeacherAllocation, Staff

class MyAllocatedClassesView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        try:
            staff = Staff.objects.get(admin=request.user)
            allocations = TeacherAllocation.objects.filter(staff_id=staff)
            data = []
            for alloc in allocations:
                classroom = alloc.classroom_id
                data.append({
                    "id": classroom.id,
                    "name": classroom.name,
                    "level": classroom.level,
                })
            return Response(data, status=status.HTTP_200_OK)
        except Staff.DoesNotExist:
            return Response([], status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)