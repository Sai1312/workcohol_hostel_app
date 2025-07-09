from django.urls import path
from .views import HostelFeeListCreateView, HostelListCreateView, StudentListCreateView, RoomListCreateView, HostelFeeDetailEdit, StudentDetailEdit, UserCreate
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    # path('register/', UserCreate.as_view(), name= 'create-user'),
    # path('token/', TokenObtainPairView.as_view(), name= 'get-token'),
    # path('refresh/', TokenRefreshView.as_view(), name= 'refresh-token'),
    path('hostelfees/', HostelFeeListCreateView.as_view(), name='hostel-fee-list'),
    path('hostelfees/<int:pk>/', HostelFeeDetailEdit.as_view(), name='hostelfee-update'),
    path('hostels/', HostelListCreateView.as_view(), name='hostel-list'),
    path('students/', StudentListCreateView.as_view(), name='student-list'),
    path('students/<int:pk>/', StudentDetailEdit.as_view(), name='students-update'),
    path('rooms/', RoomListCreateView.as_view(), name='room-list'),
    path('rooms/', RoomListCreateView.as_view(), name='room-list'),
]