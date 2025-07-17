
from django.urls import path,include
from .views import NotificationView
urlpatterns = [
    path('',NotificationView.as_view()),
    path('<int:pk>/',NotificationView.as_view())
]
