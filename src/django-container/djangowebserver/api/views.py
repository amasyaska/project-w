from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from .permissions import IsNotAuthenticated
from .serializers import UserSerializer
from .models import CustomUser

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
        pass

    
    def put(self, request):
        user = self.get_object(request.data.get('id'))
        if user is None:
            return Response(data={'error': 'User not found!'}, 
                            status=status.HTTP_404_NOT_FOUND)

        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_200_OK)
        return Response(data={"error": serializer.errors}, 
                        status=status.HTTP_400_BAD_REQUEST)
            


    def delete(self, request):
        pass
