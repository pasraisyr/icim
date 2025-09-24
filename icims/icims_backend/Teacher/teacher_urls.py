from django.urls import path
from .TeacherAttendance import (
    TeacherAttendancesView,
    AllAttendancesView,
    TeacherAttendanceInput,
    TeacherAttendanceEdit,
    TeacherAttendanceDelete,
    StudentsInClassView,
    TeacherClassesView,  # <-- Add this import
)
from .TeacherAllocationView import MyAllocatedClassesView
from .TeacherClasses import GetClassDetails

urlpatterns = [
    path('attendance/', TeacherAttendancesView.as_view(), name='teacher-attendance-list'),
    path('attendance/all/', AllAttendancesView.as_view(), name='all-attendance-list'),
    path('attendance/input/', TeacherAttendanceInput.as_view(), name='teacher-attendance-input'),
    path('attendance/edit/', TeacherAttendanceEdit.as_view(), name='teacher-attendance-edit'),
    path('attendance/delete/<int:attendance_id>/', TeacherAttendanceDelete.as_view(), name='teacher-attendance-delete'),
    path('classes/', TeacherClassesView.as_view(), name='teacher-classes'),  # <-- Update endpoint
    path('class/<int:classroom_id>/students/', StudentsInClassView.as_view(), name='students-in-class'),
    path('classes/<int:class_id>/details/', GetClassDetails.as_view(), name='teacher-class-details'),
]