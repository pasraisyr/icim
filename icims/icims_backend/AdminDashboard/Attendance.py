from icims_backend.models import Attendance, Staff, Client, Classrooms
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions

class AttendanceByTeacherView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, teacher_id):
        try:
            attendances = Attendance.objects.filter(teacher_id=teacher_id)
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
                    "date": att.date,
                })
            return Response(data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class AttendanceByStudentView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, student_id):
        try:
            attendances = Attendance.objects.filter(student_id=student_id)
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
                    "date": att.date,
                })
            return Response(data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class AttendanceByClassView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, classroom_id):
        try:
            attendances = Attendance.objects.filter(classroom_id=classroom_id)
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
                    "date": att.date,
                })
            return Response(data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)