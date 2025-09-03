from django.urls import path
from .About import AboutDelete, AboutView, AboutEdit, AboutInput
from .Subject import SubjectView, SubjectInput, SubjectEdit, SubjectDelete

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

    
]