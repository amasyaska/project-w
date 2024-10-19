from rest_framework.views import APIView
from django.contrib.auth import authenticate, login, logout
from rest_framework.decorators import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from .serializers import UserSerializer, LoginSerializer
from .models import CustomUser
from .permissions import IsNotAuthenticated

# Create your views here.
class UserAPIView(APIView):

    def get_object(self, pk):
        try:
            return CustomUser.objects.get(pk=pk)
        except CustomUser.DoesNotExist:
            return None
        

    def get_permissions(self):
        method = self.request.method
        
        if method in ['PUT', 'DELETE']:
            return [IsAuthenticated()]
        elif method == 'POST':
            return [IsNotAuthenticated()]
        return [AllowAny()]


    def get(self, request):
        if request.data.get('id'):
            user = self.get_object(request.data.get('id'))
            if user is None:
                return Response(data={'error': 'User not found.'}, 
                                status=status.HTTP_404_NOT_FOUND)
            serializer = UserSerializer(user)
            return Response(data=serializer.data, 
                            status=status.HTTP_200_OK)
        elif request.user.is_authenticated:
            user = request.user
            serializer = UserSerializer(user)
            return Response(data=serializer.data, 
                            status=status.HTTP_200_OK)
        
        return Response(
            data={'error': 'Bad request: you need to provide user id or you must be authenticated.'}, 
            status=status.HTTP_400_BAD_REQUEST
        )


    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if (serializer.is_valid(raise_exception=True)):
            user = serializer.create(serializer.validated_data)
            if (user is not None):
                user.set_password(serializer.validated_data['password'])
                user.save()
                return Response(status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)

    
    def put(self, request):
        if request.data.get('id'):
            if request.user.is_staff:
                user = self.get_object(request.data.get('id'))
                if user is None:
                    return Response(data={'error': 'User not found.'}, 
                                    status=status.HTTP_404_NOT_FOUND)
                serializer = UserSerializer(request.user, 
                                            data=request.data, partial=True)
                if serializer.is_valid():
                    serializer.save()
                    return Response(status=status.HTTP_200_OK)
                return Response(data={"error": serializer.errors}, 
                                status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response(data={'error': 'Not enough rights.'}, 
                                status=status.HTTP_403_FORBIDDEN)

        serializer = UserSerializer(request.user, 
                                    data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_200_OK)
        return Response(data={"error": serializer.errors}, 
                        status=status.HTTP_400_BAD_REQUEST)
            

    def delete(self, request):
        if request.data.get('id'):
            if request.user.is_staff:
                user = self.get_object(request.data.get('id'))
                if user is None:
                    return Response(data={'error': 'User not found.'}, 
                                    status=status.HTTP_404_NOT_FOUND)
                user.delete()
                return Response(status=status.HTTP_200_OK)
            else:
                return Response(data={'error': 'Not enough rights.'}, 
                                status=status.HTTP_403_FORBIDDEN)
            
        user = request.user
        user.delete()
        return Response(status=status.HTTP_200_OK)


class LoginAPIView(APIView):

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if (serializer.is_valid(raise_exception=True)):
            user = authenticate(request=request, username=serializer.validated_data['username'], 
                                password=serializer.validated_data['password'])
            if (user is None):
                user.set
                return Response(status=status.HTTP_401_UNAUTHORIZED)
            login(request=request, user=user)
            return Response(status=status.HTTP_200_OK)
        

class LogoutAPIView(APIView):
    
    def post(self, request):
        if request.user.is_authenticated:
            logout(request)
            return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_401_UNAUTHORIZED)