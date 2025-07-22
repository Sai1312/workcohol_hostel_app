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
import jwt
from django.conf import settings
from .utils import generatetoken
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


# def generate_token(email, role):
#     token = AccessToken()
#     token['email'] = email
#     token['role'] = role
#     return str(token)


class LogView(APIView):
    def post(self, request):
        serializer = LogSerializer(data=request.data)
        if not serializer.is_valid():
            print(serializer.errors)  
            return Response(serializer.errors, status=400)
    
        email = serializer.validated_data['email']
        password = serializer.validated_data['password']

        user = StudentLog.objects.select_related('email').filter(email__email=email).first()
        role = 'student'
        if not user:
            user = StaffLog.objects.select_related('email').filter(email__email=email).first()
            role = 'staff'          
            
        if not user:
            return Response({'error': 'Email not found'}, status=404)

        if user.password:
            return Response({'first_time': True, 'message': 'Set your password first', 'role': role}, status=200)
        
        if not check_password(password, user.password):
            return Response({'error': 'Invalid password'}, status=401)  
        
        try:
            token = generatetoken(email, role)
            print("Generated JWT token:", token)
            res = Response({'message': 'Login successful', 'role': role})
            res.set_cookie(key='access_token', value=token, httponly=True, samesite='Lax', secure=False, max_age=30*24*60*60 )
            print("token: ", token)
            return res
        except Exception as e:
            print(e)
            raise e

        
    
    
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
        
        student_item = StudentItem.objects.filter(email=email).first()
        
        if student_item:
            user, created = StudentLog.objects.get_or_create(email=student_item)
            role = 'student'
        else:
            staff_item = StaffItem.objects.filter(email=email).first()
            if staff_item:
                user, created = StaffLog.objects.get_or_create(email=staff_item)
                role = 'staff'
            else:
                return Response({"error": "Email Not Found"}, status=404)
        
        if user.password:
            return Response({"error": "Password already set"}, status=404)
        
        user = StudentLog.objects.filter(email__email=email).first()
        role = 'student'

        user.password = password
        user.save()
        
        token = generatetoken(email, role)
        print("Generated JWT token:", token)
        res = Response({"message": "Password set successfully", "role": role})
        res.set_cookie(key='access_token', value=token, httponly=True, samesite='Lax', secure=False, max_age=30*24*60*60 )
        print("token: ", token)
        return res            
    

class TokenView(APIView):
    def get(self, request):
        print("Available cookies:", request.COOKIES)
        token = request.COOKIES.get('access_token')
        print("token call: ", token)
        if not token:
            return Response({'error': 'Not authenticated'}, status=401)
        
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
            return Response({
                'email': payload['email'],
                'role': payload['role']
            })
        
        except jwt.ExpiredSignatureError:
            return Response({'error': 'Token Expired'}, status=401)
        except jwt.InvalidTokenError:
            return Response({'error': 'Invalid Token'}, status=401)