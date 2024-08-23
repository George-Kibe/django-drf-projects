from rest_framework.generics import GenericAPIView
from .serializers import UserSerializer
from rest_framework.response import Response
from rest_framework import status
from .utils import send_otp_email

# Create your views here.
class RegisterUserView(GenericAPIView):
    serializer_class = UserSerializer
    
    def post(self, request):
        user_data = request.data
        serializer = self.serializer_class(data=user_data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            user = serializer.data
            print("User: ", user)
            send_otp_email(user['email'])
            return Response({
                "data": user,
                "message": f"Greetings. Thanks for signing up. A passcode has been sent to your email"
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)