from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from .models import Profile

class UserSerializer(serializers.ModelSerializer):
    phone = serializers.CharField(source='profile.phone_number', required=False, allow_blank=True)
    university_id = serializers.CharField(source='profile.university_id', required=False, allow_blank=True)
    department = serializers.CharField(source='profile.department', required=False, allow_blank=True)
    is_email_verified = serializers.BooleanField(source='profile.is_email_verified', read_only=True)
    preferences = serializers.JSONField(source='profile.preferences', required=False, default=dict)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'date_joined',
                  'phone', 'university_id', 'department', 'is_email_verified', 'preferences']

    def update(self, instance, validated_data):
        profile_data = validated_data.pop('profile', {})
        
        # Update User fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        
        # Update Profile fields
        if profile_data:
            profile = instance.profile
            for attr, value in profile_data.items():
                setattr(profile, attr, value)
            profile.save()
        
        return instance

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password2', 'first_name', 'last_name']
    
    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return attrs
    
    def create(self, validated_data):
        validated_data.pop('password2')
        user = User.objects.create_user(**validated_data)
        return user