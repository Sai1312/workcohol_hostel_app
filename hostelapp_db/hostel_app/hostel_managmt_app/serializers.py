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
        fields = '__all__'
        
        
class StaffNestedSerializer(serializers.ModelSerializer):
    class Meta:
        model = StaffItem
        fields = ['staffid', 'name']


class OutPassSerializer(serializers.ModelSerializer):
    std = StudentNestedSerializer(read_only=True)
    approvedby = StaffNestedSerializer(read_only=True)
    
    class Meta:
        model = OutPassItem
        fields = '__all__'
        
        
class StaffSerializer(serializers.ModelSerializer):
    class Meta:
        model = StaffItem
        fields = '__all__'


class LogSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

class SetPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(min_length=4, max_length=128)