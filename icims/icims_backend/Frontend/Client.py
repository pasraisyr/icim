from icims_backend.models import Client, CustomUser, Payments, StudentAllocation
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from datetime import datetime
import json
from django.views.decorators.csrf import csrf_exempt

def get_payment_details(client):
    """Helper function to get payment history for a client"""
    payments = Payments.objects.filter(student_id=client).order_by('-payment_date')
    return [{
        "id": payment.id,
        "amount": payment.amount,
        "payment_reference": payment.payment_reference,
        "payment_date": payment.payment_date,
        "payment_method": payment.payment_method,
        "receipt": payment.receipt.url if payment.receipt else None,
        "updated_at": payment.updated_at
    } for payment in payments]

# @csrf_exempt
class ClientAddFrontEnd(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        inputs = request.data
        try:
            # Create CustomUser
            user = CustomUser.objects.create_user(
                username=inputs['studentIC'],
                first_name=inputs['first_name'],
                last_name=inputs['last_name'],
                password=inputs.get('password', 'defaultpassword'),
                user_type=4,  # Client type
                is_staff=False,
                is_superuser=False
            )

            # Calculate total and outstanding fees
            total_fees = float(inputs.get('total_fees', 0))
            initial_payment = float(inputs.get('initial_payment', 0))
            outstanding_fees = total_fees - initial_payment
            registerar = "self-registered"
            # Create Client
            client = Client.objects.get(admin=user)
            client.registerar = registerar
            client.phone_number = inputs.get('phone_number')
            client.status = inputs.get('status', 'inactive')
            client.address = inputs.get('address')
            client.studentIC = inputs.get('studentIC')
            client.guardianName = inputs.get('guardianName')
            client.guardianIC = inputs.get('guardianIC')
            client.guardianPhone = inputs.get('guardianPhone')
            client.level = inputs.get('level')
            client.class_method = inputs.get('class_method')
            client.total_fees = total_fees
            client.outstanding_fees = outstanding_fees
            client.enrollmentDate = datetime.strptime(inputs['enrollmentDate'], '%Y-%m-%d').date() if 'enrollmentDate' in inputs else None
            client.save()
            # Create initial payment(s) if provided
            # This can be one or it might be multiple payments
            payments_data = inputs.get('payments', [])
            
            # Handle legacy single payment format for backward compatibility
            if initial_payment > 0 and not payments_data:
                payments_data = [{
                    'amount': initial_payment,
                    'payment_reference': inputs.get('payment_reference'),
                    'payment_method': inputs.get('payment_method'),
                    'receipt': request.FILES.get('receipt')
                }]
            
            # Create multiple payments
            for payment_data in payments_data:
                payment_amount = float(payment_data.get('amount', 0))
                if payment_amount > 0:
                    payment = Payments.objects.create(
                        student_id=client,
                        amount=payment_amount,
                        payment_reference=payment_data.get('payment_reference'),
                        payment_method=payment_data.get('payment_method'),
                        receipt=payment_data.get('receipt')
                    )

            return Response({
                "id": client.id,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "email": user.email,
                "phone_number": client.phone_number,
                "address": client.address,
                "status": client.status,
                "studentIC": client.studentIC,
                "guardianName": client.guardianName,
                "guardianIC": client.guardianIC,
                "guardianPhone": client.guardianPhone,
                "level": client.level,
                "enrollmentDate": client.enrollmentDate,
                "class_method": client.class_method,
                "total_fees": client.total_fees,
                "outstanding_fees": client.outstanding_fees,
                "payments": get_payment_details(client),
                "updated_at": client.updated_at
            }, status=status.HTTP_201_CREATED)
        except Exception as e:
            if 'user' in locals():
                user.delete()
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


        

