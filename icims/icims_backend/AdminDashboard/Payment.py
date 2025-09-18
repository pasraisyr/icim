from icims_backend.models import Payments, Client, Classrooms
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from datetime import datetime

class PaymentsView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        payments = Payments.objects.all()
        data = []
        for payment in payments:
            data.append({
                "id": payment.id,
                "student_id": payment.student_id.id,
                "class_package": payment.class_package.id if payment.class_package else None,
                "class_package_name": payment.class_package.name if payment.class_package else None,
                "payment_method": payment.payment_method,
                "payment_reference": payment.payment_reference,
                "payment_receipt": payment.payment_receipt.url if payment.payment_receipt else None,
                "selected_payments": payment.selected_payments,
                "total_payment": float(payment.total_payment),
                "submitted_at": payment.submitted_at,
            })
        return Response(data, status=status.HTTP_200_OK)

class PaymentView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def get(self, request, payment_id):
        try:
            payment = Payments.objects.get(id=payment_id)
            return Response({
                "id": payment.id,
                "student_id": payment.student_id.id,
                "class_package": payment.class_package.id if payment.class_package else None,
                "class_package_name": payment.class_package.name if payment.class_package else None,
                "payment_method": payment.payment_method,
                "payment_reference": payment.payment_reference,
                "payment_receipt": payment.payment_receipt.url if payment.payment_receipt else None,
                "selected_payments": payment.selected_payments,
                "total_payment": float(payment.total_payment),
                "submitted_at": payment.submitted_at,
            }, status=status.HTTP_200_OK)
        except Payments.DoesNotExist:
            return Response({"error": "Payment not found"}, status=status.HTTP_404_NOT_FOUND)

class PaymentInput(APIView):
    permission_classes = [permissions.IsAdminUser]

    def post(self, request):
        inputs = request.data
        try:
            client = Client.objects.get(id=inputs['student_id'])
            class_package = None
            if 'class_package' in inputs and inputs['class_package']:
                class_package = Classrooms.objects.get(id=inputs['class_package'])
            payment = Payments.objects.create(
                student_id=client,
                class_package=class_package,
                payment_method=inputs.get('payment_method'),
                payment_reference=inputs.get('payment_reference'),
                payment_receipt=inputs.get('payment_receipt'),
                selected_payments=inputs.get('selected_payments', []),
                total_payment=inputs.get('total_payment', 0.00),
            )
            return Response({
                "id": payment.id,
                "student_id": payment.student_id.id,
                "class_package": payment.class_package.id if payment.class_package else None,
                "class_package_name": payment.class_package.name if payment.class_package else None,
                "payment_method": payment.payment_method,
                "payment_reference": payment.payment_reference,
                "payment_receipt": payment.payment_receipt.url if payment.payment_receipt else None,
                "selected_payments": payment.selected_payments,
                "total_payment": float(payment.total_payment),
                "submitted_at": payment.submitted_at,
            }, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class PaymentEdit(APIView):
    permission_classes = [permissions.IsAdminUser]

    def put(self, request):
        inputs = request.data
        try:
            payment = Payments.objects.get(id=inputs['id'])
            fields = [
                'payment_method', 'payment_reference', 'selected_payments', 'total_payment'
            ]
            for field in fields:
                if field in inputs:
                    setattr(payment, field, inputs[field])
            if 'payment_receipt' in inputs:
                payment.payment_receipt = inputs['payment_receipt']
            if 'class_package' in inputs and inputs['class_package']:
                payment.class_package = Classrooms.objects.get(id=inputs['class_package'])
            payment.save()
            return Response({
                "id": payment.id,
                "student_id": payment.student_id.id,
                "class_package": payment.class_package.id if payment.class_package else None,
                "class_package_name": payment.class_package.name if payment.class_package else None,
                "payment_method": payment.payment_method,
                "payment_reference": payment.payment_reference,
                "payment_receipt": payment.payment_receipt.url if payment.payment_receipt else None,
                "selected_payments": payment.selected_payments,
                "total_payment": float(payment.total_payment),
                "submitted_at": payment.submitted_at,
            }, status=status.HTTP_200_OK)
        except Payments.DoesNotExist:
            return Response({"error": "Payment not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class PaymentDelete(APIView):
    permission_classes = [permissions.IsAdminUser]

    def delete(self, request, payment_id):
        try:
            payment = Payments.objects.get(id=payment_id)
            payment.delete()
            return Response({"message": "Payment deleted successfully"}, status=status.HTTP_200_OK)
        except Payments.DoesNotExist:
            return Response({"error": "Payment not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)