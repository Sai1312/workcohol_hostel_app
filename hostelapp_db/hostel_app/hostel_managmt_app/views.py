from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.hashers import check_password, make_password
from rest_framework_simplejwt.tokens import RefreshToken
from .models import HostelFeeItem, HostelItem, StudentItem, Room, VisitorItem, OutPassItem, StaffItem, StudentLog, StaffLog
from .serializers import HostelFeeItemSerializer, HostelItemSerializer, StudentItemSerializer, RoomSerializer, VisitorSerializer, OutPassSerializer, StaffSerializer, LogSerializer, SetPasswordSerializer
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import AccessToken
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
    queryset = OutPassItem.objects.all()
    serializer_class = OutPassSerializer
    
    
class OutPassDetailEdit(generics.RetrieveUpdateDestroyAPIView):
    queryset = OutPassItem.objects.all()
    serializer_class = OutPassSerializer
    
    
class StaffListCreateView(generics.ListCreateAPIView):
    queryset = StaffItem.objects.all()
    serializer_class = StaffSerializer
    
    
class StaffDetailEdit(generics.RetrieveUpdateDestroyAPIView):
    queryset = StaffItem.objects.all()
    serializer_class = StaffSerializer    


def generate_token(email, role):
    token = AccessToken()
    token['email'] = email
    token['role'] = role
    return str(token)


class LogView(APIView):
    def post(self, request):
        serializer = LogSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        email = serializer.validated_data['email']
        password = serializer.validated_data['password']

        # try:
        #     user = StudentLog.objects.filter(email__email=email).first()
        #     role = 'student'
        # except StudentLog.DoesNotExist:
        #     try:
        #         user = StaffLog.objects.filter(staff__email=email).first() 
        #         role = 'staff'
        #     except StaffLog.DoesNotExist:
        #         return Response({'error': 'Email not found'}, status=404)
        # if user:
        #     user = StudentLog.objects.filter(email__email=email).first()
        #     role = 'student'
        # elif user:
        #     user = StaffLog.objects.filter(staff__email=email).first() 
        #     role = 'staff'
        # else:
        #     return Response({'error': 'Email not found'}, status=404)
        
        user = StudentLog.objects.select_related('email').filter(email__email=email).first()
        role = 'student'
        if not user:
            user = StaffLog.objects.select_related('email').filter(email__email=email).first()
            role = 'staff'          
            
        if not user:
            return Response({'error': 'Email not found'}, status=404)

        if user.password is None:
            return Response({'first_time': True, 'message': 'Set your password first', 'role': role}, status=200)
        
        if not check_password(password, user.password):
            return Response({'error': 'Invalid password'}, status=401)  
        
        token = generate_token(email, role, password)
        res = Response({'message': 'Login successful', 'role': role})
        res.set_cookie('access_token', token, httponly=True, samesite='Lax')
        return res
    
    
class SetPasswordView(APIView):
    def post(self, request):
        print(">>> SetPasswordView called")
        print("request.data:", request.data)
        
        serializer = SetPasswordSerializer(data=request.data)
        
        serializer.is_valid(raise_exception=True)
        if not serializer.is_valid():
            print("serializer.errors:", serializer.errors) 
            return Response(serializer.errors, status=400) 
        
        email = serializer.validated_data['email']
        password = make_password(serializer.validated_data['password'])
        
        print("Checking StudentLog...")
        
        user = StudentLog.objects.filter(email__email=email).first()
        role = 'student'
        
        if not user:
            print("Not found in StudentLog. Checking StaffLog...")
            user = StaffLog.objects.filter(email__email=email).first()
            role = 'staff'
            
        if not user:
            print("Not found in StaffLog either.")
            return Response({"error": "Email not found"}, status=404)
        
        if user.password:
            return Response({"error": "Password already set"}, status=400)


        user.password = password
        user.save()

        token = generate_token(email, role)
        res = Response({"message": "Password set successfully", "role": role})
        res.set_cookie('access_token', token, httponly=True, samesite='Lax')
        return res