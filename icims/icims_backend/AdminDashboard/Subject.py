from icims_backend.models import Subject
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions

class SubjectView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        subjects = Subject.objects.all()
        data = []
        for subject in subjects:
            data.append({
                "id": subject.id,
                "name": subject.name,
                "status": subject.status,
                "updated_at": subject.updated_at
            })
        return Response(data, status=status.HTTP_200_OK)

class SubjectInput(APIView):
    permission_classes = [permissions.IsAdminUser]

    def post(self, request):
        inputs = request.data
        try:
            name = inputs['name']
            status_val = inputs.get('status', 'inactive')
            obj = Subject.objects.create(name=name, status=status_val)
            return Response({
                "id": obj.id,
                "name": obj.name,
                "status": obj.status,
                "updated_at": obj.updated_at
            }, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class SubjectEdit(APIView):
    permission_classes = [permissions.IsAdminUser]

    def put(self, request):
        inputs = request.data
        try:
            subject_id = inputs['id']
            name = inputs.get('name')
            status_val = inputs.get('status')
            obj = Subject.objects.get(id=subject_id)
            if name:
                obj.name = name
            if status_val:
                obj.status = status_val
            obj.save()
            return Response({
                "id": obj.id,
                "name": obj.name,
                "status": obj.status,
                "updated_at": obj.updated_at
            }, status=status.HTTP_200_OK)
        except Subject.DoesNotExist:
            return Response({"error": "Subject not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class SubjectDelete(APIView):
    permission_classes = [permissions.IsAdminUser]

    def delete(self, request):
        try:
            inputs = request.data
            subject_id = inputs.get('id')
            obj = Subject.objects.get(id=subject_id)
            obj.delete()
            return Response({"status": "success"}, status=status.HTTP_200_OK)
        except Subject.DoesNotExist:
            return Response({"error": "Subject not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)