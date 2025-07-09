from rest_framework import serializers
from .models import HostelFeeItem, HostelItem, StudentItem, Room, VisitorItem, OutPassItem, StaffItem
from django.contrib.auth.models import User

class StudentItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentItem
        fields = '__all__'
        
        
class StudentNestedSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentItem
        fields = ['stdid', 'name']


class HostelFeeItemSerializer(serializers.ModelSerializer):
    std = StudentNestedSerializer(read_only=True)
    
    class Meta:
        model = HostelFeeItem
        fields = '__all__'
        
        
class HostelItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = HostelItem
        fields = '__all__'
        

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = '__all__'        
        

class VisitorSerializer(serializers.ModelSerializer):
    std = StudentNestedSerializer(read_only=True)
    
    class Meta:
        model = VisitorItem
        field = '__all__'
        
        
class StaffNestedSerializer(serializers.ModelSerializer):
    class Meta:
        model = StaffItem
        field = ['staffid', 'name']


class OutPassSerializer(serializers.ModelSerializer):
    std = StudentNestedSerializer(read_only=True)
    approvedby = StaffNestedSerializer(read_only=True)
    
    class Meta:
        model = OutPassItem
        field = '__all__'
        
        
class StaffSerializer(serializers.ModelSerializer):
    class Meta:
        model = StaffItem
        field = '__all__'

class UserSerializer(serializers.ModelSerializer):
    
    password = serializers.CharField(write_only=True)   
    
    class Meta:
        model = User
        fields=['username', 'password', 'email']
        
    def create(self, validated_data):
        user= User.objects.create_user(username=validated_data['username'], password=validated_data['password'],email=validated_data.get('email', ''))
        return user