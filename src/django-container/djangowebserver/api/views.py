from django.shortcuts import render
from django.contrib.auth import authenticate

from rest_framework.decorators import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authentication import BasicAuthentication

from .serializers import UserSerializer, LoginSerializer
from .models import CustomUser

# Create your views here.
class UserAPIView(APIView):

    def get_object(self, pk):
        try:
            return CustomUser.objects.get(pk=pk)
        except CustomUser.DoesNotExist:
            return Response(data='User not found!', status=status.HTTP_404_NOT_FOUND)


    def get(self, request, pk):
        user = self.get_object(pk)
        serializer = UserSerializer(user)
        return Response(data=serializer.data, status=status.HTTP_200_OK)


    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if (serializer.is_valid(raise_exception=True)):
            user = serializer.create(serializer.validated_data)
            if (user is not None):
                return Response(status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)

    
    def put(self, request, pk):
        pass


    def delete(self, request, pk):
        pass


class LoginAPIView(APIView):

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if (serializer.is_valid(raise_exception=True)):
            user = authenticate(request=request, username=request.data['username'], password=request.data['password'])
            if (user is None):
                return Response(status=status.HTTP_401_UNAUTHORIZED)
            print(user)
            return Response(status=status.HTTP_200_OK)