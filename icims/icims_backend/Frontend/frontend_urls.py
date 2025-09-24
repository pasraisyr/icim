from django.urls import path
from .Client import ClientAddFrontEnd
from .ClientPayment import ClientPaymentInput, ClientPaymentEdit, ClientPaymentView, ClientPaymentListView, ClientPaymentDelete, ClientPaymentUpdate

urlpatterns = [

    # Client
    path('client/input/', ClientAddFrontEnd.as_view(), name='client_input'),

    # ClientPayment
    path('client_payment/input/', ClientPaymentInput.as_view(), name='client_payment_input'),
    path('client_payment/edit/status/', ClientPaymentEdit.as_view(), name='client_payment_edit'),
    path('client_payment/view/<int:client_id>/', ClientPaymentView.as_view(), name='client_payment_view'),
    path('client_payment/list/', ClientPaymentListView.as_view(), name='client_payment_list'),
    path('client_payment/delete/<int:client_id>/', ClientPaymentDelete.as_view(), name='client_payment_delete'),
    path('client_payment/update/', ClientPaymentUpdate.as_view(), name='client_payment_update'),
]