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
    std_id = StudentNestedSerializer(read_only=True)
    
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
    std_id = serializers.PrimaryKeyRelatedField(
        queryset=StudentItem.objects.all(), source='std', write_only=True
    )
    std = StudentNestedSerializer(read_only = True)    
    class Meta:
        model = VisitorItem
        fields = '__all__'
        
        
class StaffNestedSerializer(serializers.ModelSerializer):
    class Meta:
        model = StaffItem
        fields = ['staffid', 'name']


class OutPassSerializer(serializers.ModelSerializer):
    std_id = serializers.PrimaryKeyRelatedField(
        queryset=StudentItem.objects.all(), source='std', write_only=True
    )
    std = StudentNestedSerializer(read_only=True)
    
    approvedby_id = serializers.PrimaryKeyRelatedField(
        queryset=StaffItem.objects.all(), source='approvedby', write_only=True, allow_null=True, required=False
    )
    approvedby = StaffNestedSerializer(read_only=True)
    # std = serializers.PrimaryKeyRelatedField(queryset=StudentItem.objects.all())
    # approvedby = serializers.PrimaryKeyRelatedField(
    #     queryset=StaffItem.objects.all(), required=False, allow_null=True
    # )
    
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