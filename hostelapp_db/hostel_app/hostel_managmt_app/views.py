from rest_framework import generics
from .models import HostelFeeItem, HostelItem, StudentItem, Room, VisitorItem, OutPassItem, StaffItem
from .serializers import HostelFeeItemSerializer, HostelItemSerializer, StudentItemSerializer, RoomSerializer, VisitorSerializer, OutPassSerializer, StaffSerializer, UserSerializer
from django.contrib.auth.models import User
# from rest_framework.permissions import IsAuthenticated


class StudentListCreateView(generics.ListCreateAPIView):
    queryset = StudentItem.objects.all()
    serializer_class = StudentItemSerializer
    # permission_classes =[IsAuthenticated]
    
class StudentDetailEdit(generics.RetrieveUpdateDestroyAPIView):
    queryset = StudentItem.objects.all()
    serializer_class = StudentItemSerializer
    # permission_classes =[IsAuthenticated]


class HostelFeeListCreateView(generics.ListCreateAPIView):
    queryset = HostelFeeItem.objects.all()
    serializer_class = HostelFeeItemSerializer


class HostelFeeDetailEdit(generics.RetrieveUpdateDestroyAPIView):
    queryset = HostelFeeItem.objects.all()    
    serializer_class = HostelFeeItemSerializer
    # permission_classes =[IsAuthenticated]

# class HostelFeeDetailEdit(generics.RetrieveUpdateDestroyAPIView):
#     queryset = HostelFeeItem.objects.all()
#     serializer_class = HostelFeeItemSerializer
    # permission_classes =[IsAuthenticated]

class HostelListCreateView(generics.ListCreateAPIView):
    queryset = HostelItem.objects.all()
    serializer_class = HostelItemSerializer
    # permission_classes =[IsAuthenticated]

    
class RoomListCreateView(generics.ListCreateAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    # permission_classes =[IsAuthenticated]


class VisitorListCreateView(generics.ListCreateAPIView):
    queryset = VisitorItem.objects.all()
    serializer_class = VisitorSerializer
    
    
class VisitorDetailEdit(generics.RetrieveUpdateDestroyAPIView):
    queryset = VisitorItem.objects.all()
    serializer_class = VisitorSerializer
    
    
class OutPassListCreateView(generics.ListCreateAPIView):
    queryset = OutPassItem.object.all()
    serializer_class = OutPassSerializer
    
    
class OutPassDetailEdit(generics.RetrieveUpdateDestroyAPIView):
    queryset = OutPassItem.object.all()
    serializer_class = OutPassSerializer
    
    
class StaffListCreateView(generics.ListCreateAPIView):
    queryset = StaffItem.object.all()
    serializer_class = StaffSerializer
    
    
class StaffDetailEdit(generics.RetrieveUpdateDestroyAPIView):
    queryset = StaffItem.object.all()
    serializer_class = StaffSerializer    


class UserCreate(generics.CreateAPIView):
    queryset= User.objects.all()
    serializer_class = UserSerializer
    # permission_classes = []
