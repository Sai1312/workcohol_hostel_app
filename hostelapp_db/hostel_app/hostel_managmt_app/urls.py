from django.urls import path
from .views import (HostelFeeListCreateView, HostelListCreateView, StudentListCreateView, RoomListCreateView, HostelFeeDetailEdit, StudentDetailEdit, LogView,
                    SetPasswordView, VisitorListCreateView, VisitorDetailEdit, OutPassListCreateView, OutPassDetailEdit, StaffListCreateView, StaffDetailEdit,
                    TokenView, LogoutView)
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    
    # Authentication
    path('login/', LogView.as_view(), name='login'),  
    path('passwordset/', SetPasswordView.as_view(), name='password-set'),
    
    # Token Request from cookie
    path('access_token/', TokenView.as_view(), name= 'token'),
    
    # Logout 
    path('logout/', LogoutView.as_view(), name='logout'),
    
    path('hostelfees/', HostelFeeListCreateView.as_view(), name='hostel-fee-list'),
    path('hostelfees/<int:pk>/', HostelFeeDetailEdit.as_view(), name='hostelfee-update'),
    path('hostelfeeid/<int:std_id_id>/', HostelFeeListCreateView.as_view(), name='hostelfee-update'),
    path('hostels/', HostelListCreateView.as_view(), name='hostel-list'),
    path('students/', StudentListCreateView.as_view(), name='student-list'),
    path('students/<int:pk>/', StudentDetailEdit.as_view(), name='students-update'),
    path('rooms/', RoomListCreateView.as_view(), name='room-list'),
    path('rooms/<int:pk>/', RoomListCreateView.as_view(), name='room-list'),
    # Visitors
    path('visitors/', VisitorListCreateView.as_view(), name='visitor-list-create'),
    path('visitors/<int:pk>/', VisitorDetailEdit.as_view(), name='visitor-detail'),

    # OutPasses
    path('outpasses/', OutPassListCreateView.as_view(), name='outpass-list-create'),
    path('outpasses/<int:pk>/', OutPassDetailEdit.as_view(), name='outpass-detail'),

    # Staff
    path('staff/', StaffListCreateView.as_view(), name='staff-list-create'),
    path('staff/<int:pk>/', StaffDetailEdit.as_view(), name='staff-detail'),
    # path('api/staff/', staff_create),
]