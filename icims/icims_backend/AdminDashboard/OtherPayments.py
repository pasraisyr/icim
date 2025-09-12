from icims_backend.models import OtherPayments
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions

class OtherPaymentView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        payments = OtherPayments.objects.all()
        data = []
        for payment in payments:
            data.append({
                "id": payment.id,
                "name": payment.name,
                "price": payment.price,
                "status": payment.status,
                "updated_at": payment.updated_at
            })
        return Response(data, status=status.HTTP_200_OK)

class OtherPaymentInput(APIView):
    permission_classes = [permissions.IsAdminUser]

    def post(self, request):
        inputs = request.data
        try:
            name = inputs['name']
            price = inputs['price']
            status_val = inputs.get('status', True)
            obj = OtherPayments.objects.create(name=name, price=price, status=status_val)
            return Response({
                "id": obj.id,
                "name": obj.name,
                "price": obj.price,
                "status": obj.status,
                "updated_at": obj.updated_at
            }, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class OtherPaymentEdit(APIView):
    permission_classes = [permissions.IsAdminUser]

    def put(self, request):
        inputs = request.data
        try:
            payment_id = inputs['id']
            name = inputs.get('name')
            price = inputs.get('price')
            status_val = inputs.get('status')
            obj = OtherPayments.objects.get(id=payment_id)
            if name:
                obj.name = name
            if price is not None:
                obj.price = price
            if status_val is not None:
                obj.status = status_val
            obj.save()
            return Response({
                "id": obj.id,
                "name": obj.name,
                "price": obj.price,
                "status": obj.status,
                "updated_at": obj.updated_at
            }, status=status.HTTP_200_OK)
        except OtherPayments.DoesNotExist:
            return Response({"error": "OtherPayment not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class OtherPaymentDelete(APIView):
    permission_classes = [permissions.IsAdminUser]

    def delete(self, request):
        try:
            inputs = request.data
            payment_id = inputs.get('id')
            obj = OtherPayments.objects.get(id=payment_id)
            obj.delete()
            return Response({"status": "success"}, status=status.HTTP_200_OK)
        except OtherPayments.DoesNotExist:
            return Response({"error": "OtherPayment not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

