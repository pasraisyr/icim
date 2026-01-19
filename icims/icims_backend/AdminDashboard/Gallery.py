from icims_backend.models import Gallery
from icims_backend.serializers import GallerySerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework.parsers import MultiPartParser, FormParser


class GalleryView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        galleries = Gallery.objects.filter(status=True)
        serializer = GallerySerializer(galleries, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)


class GalleryInput(APIView):
    permission_classes = [permissions.IsAdminUser]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        serializer = GallerySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GalleryUpdate(APIView):
    permission_classes = [permissions.IsAdminUser]
    parser_classes = [MultiPartParser, FormParser]

    def patch(self, request, gallery_id):
        try:
            gallery = Gallery.objects.get(id=gallery_id)
            serializer = GallerySerializer(gallery, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Gallery.DoesNotExist:
            return Response({"error": "Gallery not found"}, status=status.HTTP_404_NOT_FOUND)


class GalleryDelete(APIView):
    permission_classes = [permissions.IsAdminUser]

    def delete(self, request, gallery_id):
        try:
            gallery = Gallery.objects.get(id=gallery_id)
            gallery.delete()
            return Response({"message": "Gallery deleted successfully"}, status=status.HTTP_200_OK)
        except Gallery.DoesNotExist:
            return Response({"error": "Gallery not found"}, status=status.HTTP_404_NOT_FOUND)
