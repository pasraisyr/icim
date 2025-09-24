from icims_backend.models import Attendance, Staff, Client, Classrooms, CustomUser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from icims_backend.models import TeacherAllocation

class TeacherAttendancesView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        try:
            staff = Staff.objects.get(admin=request.user)
            attendances = Attendance.objects.filter(teacher_id=staff)
            data = []
            for att in attendances:
                student_user = att.student_id.admin
                classroom = att.classroom_id
                data.append({
                    "id": att.id,
                    "student_id": att.student_id.id,
                    "student_name": f"{student_user.first_name} {student_user.last_name}",
                    "classroom_id": classroom.id,
                    "classroom_name": classroom.name,
                    "status": att.status,
                    "updated_at": att.updated_at,
                    "date": att.date, 
                })
            return Response(data, status=status.HTTP_200_OK)
        except Staff.DoesNotExist:
            return Response({"error": "Staff profile not found."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class AllAttendancesView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def get(self, request):
        try:
            attendances = Attendance.objects.all()
            data = []
            for att in attendances:
                student_user = att.student_id.admin
                teacher_user = att.teacher_id.admin
                classroom = att.classroom_id
                data.append({
                    "id": att.id,
                    "student_id": att.student_id.id,
                    "student_name": f"{student_user.first_name} {student_user.last_name}",
                    "teacher_id": att.teacher_id.id,
                    "teacher_name": f"{teacher_user.first_name} {teacher_user.last_name}",
                    "classroom_id": classroom.id,
                    "classroom_name": classroom.name,
                    "status": att.status,
                    "updated_at": att.updated_at,
                })
            return Response(data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class TeacherAttendanceInput(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        data = request.data
        student_id = data.get('student_id')
        classroom_id = data.get('classroom_id')
        date = data.get('date')
        attendance_status = data.get('status')  # <-- changed here

        try:
            staff = Staff.objects.get(admin=request.user)
            attendance, created = Attendance.objects.update_or_create(
                student_id_id=student_id,
                classroom_id_id=classroom_id,
                date=date,
                defaults={'status': attendance_status, 'teacher_id_id': staff.id}  # <-- changed here
            )
            return Response({
                'message': 'Attendance updated' if not created else 'Attendance created',
                'attendance_id': attendance.id,
                'status': attendance.status
            }, status=status.HTTP_200_OK)
        except Staff.DoesNotExist:
            return Response({"error": "Staff profile not found."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class TeacherAttendanceEdit(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def put(self, request):
        inputs = request.data
        try:
            att = Attendance.objects.get(id=inputs['id'])
            staff = Staff.objects.get(admin=request.user)
            if att.teacher_id != staff:
                return Response({"error": "Permission denied"}, status=status.HTTP_403_FORBIDDEN)
            if 'status' in inputs:
                att.status = inputs['status']
            if 'classroom_id' in inputs:
                classroom = Classrooms.objects.get(id=inputs['classroom_id'])
                att.classroom_id = classroom
            att.save()
            return Response({
                "id": att.id,
                "student_id": att.student_id.id,
                "teacher_id": att.teacher_id.id,
                "classroom_id": att.classroom_id.id,
                "status": att.status,
                "updated_at": att.updated_at,
            }, status=status.HTTP_200_OK)
        except Attendance.DoesNotExist:
            return Response({"error": "Attendance not found."}, status=status.HTTP_404_NOT_FOUND)
        except Classrooms.DoesNotExist:
            return Response({"error": "Classroom not found."}, status=status.HTTP_404_NOT_FOUND)
        except Staff.DoesNotExist:
            return Response({"error": "Staff profile not found."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class TeacherAttendanceDelete(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request, attendance_id):
        try:
            att = Attendance.objects.get(id=attendance_id)
            staff = Staff.objects.get(admin=request.user)
            if att.teacher_id != staff:
                return Response({"error": "Permission denied"}, status=status.HTTP_403_FORBIDDEN)
            att.delete()
            return Response({"message": "Attendance deleted successfully"}, status=status.HTTP_200_OK)
        except Attendance.DoesNotExist:
            return Response({"error": "Attendance not found."}, status=status.HTTP_404_NOT_FOUND)
        except Staff.DoesNotExist:
            return Response({"error": "Staff profile not found."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class StudentsInClassView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, classroom_id):
        try:
            from icims_backend.models import StudentAllocation  # Import here to avoid circular import
            allocations = StudentAllocation.objects.filter(classroom_id=classroom_id)
            data = []
            for alloc in allocations:
                student = alloc.student_id
                user = student.admin
                data.append({
                    "id": student.id,
                    "studentName": f"{user.first_name} {user.last_name}",
                    "studentIC": student.studentIC,
                    "email": user.email,
                })
            return Response(data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class TeacherClassesView(APIView):
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