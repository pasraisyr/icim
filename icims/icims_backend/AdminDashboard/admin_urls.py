from django.urls import path
from .About import AboutDelete, AboutView, AboutEdit, AboutInput
from .Subject import SubjectView, SubjectInput, SubjectEdit, SubjectDelete
from .Client import ClientView, ClientInput, ClientEdit, ClientDelete, ClientsView, ClientPayment
from .Classrooms import ClassroomsView, ClassroomsInput, ClassroomsEdit, ClassroomsDelete, ClassroomView
from .Staffs import StaffsView, StaffInput, StaffEdit, StaffDelete, StaffView
from .TeacherAllocation import TeacherAllocationView, TeacherAllocationInput, TeacherAllocationEdit, TeacherAllocationDelete, TeacherAllocationsView
from .StudentAllocation import StudentAllocationView, StudentAllocationInput, StudentAllocationEdit, StudentAllocationDelete, StudentAllocationsView

urlpatterns = [

    # About
    path('about/', AboutView.as_view(), name='about'),
    path('about/input/', AboutInput.as_view(), name='about_input'),
    path('about/edit/', AboutEdit.as_view(), name='about_edit'),
    path('about/delete/', AboutDelete.as_view(), name='about_delete'),
    
    # Subject
    path('subject/', SubjectView.as_view(), name='subject'),
    path('subject/input/', SubjectInput.as_view(), name='subject_input'),
    path('subject/edit/', SubjectEdit.as_view(), name='subject_edit'),
    path('subject/delete/', SubjectDelete.as_view(), name='subject_delete'),

    # Client
    path('client/<int:client_id>/', ClientView.as_view(), name='client'),
    path('client/input/', ClientInput.as_view(), name='client_input'),
    path('client/edit/', ClientEdit.as_view(), name='client_edit'),
    path('client/delete/<int:client_id>/', ClientDelete.as_view(), name='client_delete'),
    path('clients/', ClientsView.as_view(), name='clients'),
    path('client/payment/', ClientPayment.as_view(), name='client_payment'),

    # Classrooms
    path('classrooms/', ClassroomsView.as_view(), name='classrooms'),
    path('classrooms/input/', ClassroomsInput.as_view(), name='classrooms_input'),
    path('classrooms/edit/', ClassroomsEdit.as_view(), name='classrooms_edit'),
    path('classrooms/delete/', ClassroomsDelete.as_view(), name='classrooms_delete'),
    path('classroom/<int:classroom_id>/', ClassroomView.as_view(), name='classroom'),

    # Staffs
    path('staffs/', StaffsView.as_view(), name='staffs'),
    path('staff/input/', StaffInput.as_view(), name='staff_input'),
    path('staff/edit/', StaffEdit.as_view(), name='staff_edit'),
    path('staff/delete/', StaffDelete.as_view(), name='staff_delete'),
    path('staff/<int:staff_id>/', StaffView.as_view(), name='staff'),

    # Teacher Allocation
    path('teacher_allocations/', TeacherAllocationsView.as_view(), name='teacher_allocations'),
    path('teacher_allocation/<int:allocation_id>/', TeacherAllocationView.as_view(), name='teacher_allocation'),
    path('teacher_allocation/input/', TeacherAllocationInput.as_view(), name='teacher_allocation_input'),
    path('teacher_allocation/edit/', TeacherAllocationEdit.as_view(), name='teacher_allocation_edit'),
    path('teacher_allocation/delete/', TeacherAllocationDelete.as_view(), name='teacher_allocation_delete'),

    # Student Allocation
    path('student_allocations/', StudentAllocationsView.as_view(), name='student_allocations'),
    path('student_allocation/<int:allocation_id>/', StudentAllocationView.as_view(), name='student_allocation'),
    path('student_allocation/input/', StudentAllocationInput.as_view(), name='student_allocation_input'),
    path('student_allocation/edit/', StudentAllocationEdit.as_view(), name='student_allocation_edit'),
    path('student_allocation/delete/', StudentAllocationDelete.as_view(), name='student_allocation_delete'),

]