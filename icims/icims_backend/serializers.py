from .models import CustomUser
import mimetypes
from rest_framework import serializers
class ObtainTokenSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'first_name', 'last_name', 'email']

