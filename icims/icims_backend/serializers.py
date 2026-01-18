from .models import CustomUser, Gallery
import mimetypes
from rest_framework import serializers
class ObtainTokenSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'first_name', 'last_name', 'email']

class GallerySerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    
    class Meta:
        model = Gallery
        fields = '__all__'
    
    def get_image(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None

