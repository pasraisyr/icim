from django.urls import path
from .Client import ClientAddFrontEnd

urlpatterns = [

    # Client
    path('client/input/', ClientAddFrontEnd.as_view(), name='client_input'),

]