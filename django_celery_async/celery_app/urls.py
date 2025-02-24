from django.urls import path
from .views import testView, send_mail_to_all_users, sendmailattime

urlpatterns = [
    path("", testView, name="test"),
    path('sendmail/', send_mail_to_all_users,name="send_mail_to_all_users"),
    path('sendmailattime/', sendmailattime,name="sendmailattime"),
]
