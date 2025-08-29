from icims_backend.models import Elements
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
import json


class AboutView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        elements = Elements.objects.filter(element="About")
        data = []
        for element in elements:
            # kalau data tu JSON string, parse dulu
            try:
                parsed_data = element.data if isinstance(element.data, dict) else json.loads(element.data)
            except Exception:
                parsed_data = {}

            data.append({
                "id": element.id,
                "element": element.element,
                "title": parsed_data.get("title", ""),
                "description": parsed_data.get("description", ""),
                "status": parsed_data.get("status", "inactive")
            })
        return Response(data, status=status.HTTP_200_OK)


class AboutInput(APIView):
    permission_classes = [permissions.IsAdminUser]

    def post(self, request):
        inputs = request.data
        try:
            element = inputs['element']
            data = inputs['data']   # expect JSON {title, description, status}

            obj = Elements.objects.create(element=element, data=data)

            return Response({
                "id": obj.id,
                "element": obj.element,
                "title": data.get("title", ""),
                "description": data.get("description", ""),
                "status": data.get("status", "inactive")
            }, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class AboutEdit(APIView):
    permission_classes = [permissions.IsAdminUser]

    def put(self, request):
        inputs = request.data
        try:
            element = inputs['element']
            data = inputs['data']

            obj = Elements.objects.get(element=element)
            obj.data = data
            obj.save()

            return Response({
                "id": obj.id,
                "element": obj.element,
                "title": data.get("title", ""),
                "description": data.get("description", ""),
                "status": data.get("status", "inactive")
            }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class AboutDelete(APIView):
    permission_classes = [permissions.IsAdminUser]

    def delete(self, request):
        try:
            inputs = request.data
            element = inputs.get('element')
            id = inputs.get('id')

            obj = Elements.objects.get(element=element, id=id)
            obj.delete()

            return Response({"status": "success"}, status=status.HTTP_200_OK)
        except Elements.DoesNotExist:
            return Response({"error": "Element not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
