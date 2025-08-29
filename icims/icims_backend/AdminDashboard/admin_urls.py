from django.urls import path
from .About import AboutDelete, AboutView, AboutEdit, AboutInput

urlpatterns = [

    # About
    path('about/', AboutView.as_view(), name='about'),
    path('about/input/', AboutInput.as_view(), name='about_input'),
    path('about/edit/', AboutEdit.as_view(), name='about_edit'),
    path('about/delete/', AboutDelete.as_view(), name='about_delete'),

    
]