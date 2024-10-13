from django.shortcuts import render
from rest_framework.decorators import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSerializer
from .models import CustomUser

# Create your views here.
class UserAPIView(APIView):

    def get_object(self, pk):
        try:
            return CustomUser.objects.get(pk=pk)
        except CustomUser.DoesNotExist:
            return None


    def get(self, request, pk):
        user = self.get_object(pk)
        if user is None:
            return Response(data='User not found!', status=status.HTTP_404_NOT_FOUND)
        serializer = UserSerializer(user)
        return Response(data=serializer.data, status=200)


    def post(self, request):
        pass

    
    def put(self, request, pk):
        pass


    def delete(self, request, pk):
        pass
