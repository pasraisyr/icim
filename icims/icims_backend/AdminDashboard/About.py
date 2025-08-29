from icims_backend.models import Elements
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions

class AboutView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        try:
            element = Elements.objects.get(element="About")
            data = element.data if element.data else {}
            return Response(data, status=status.HTTP_200_OK)
        except Elements.DoesNotExist:
            return Response({"error": "Element not found"}, status=status.HTTP_404_NOT_FOUND)

class AboutInput(APIView):
    permission_classes = [permissions.IsAdminUser]

    def post(self, request):
        inputs = request.data
        try:
            element = inputs.element
            data = inputs.data
            obj, created = Elements.objects.get_or_create(element=element)
            obj.data = data
            obj.save()
            return Response({"status": "success"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class AboutEdit(APIView):
    permission_classes = [permissions.IsAdminUser]

    def put(self, request):
        inputs = request.data
        try:
            data = inputs.data
            element = inputs.element
            obj = Elements.objects.get(element=element)
            obj.data = data
            obj.save()
            return Response({"status": "success"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class AboutDelete(APIView):
    permission_classes = [permissions.IsAdminUser]

    def delete(self, request):
        try:
            inputs = request.data
            element = inputs.element
            obj = Elements.objects.get(element=element)
            obj.delete()
            return Response({"status": "success"}, status=status.HTTP_200_OK)
        except Elements.DoesNotExist:
            return Response({"error": "Element not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
