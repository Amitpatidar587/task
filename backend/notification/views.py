from rest_framework import status
from rest_framework.response import Response
from .models import NotificationModel
from .serializers import NotificationSerializer
from rest_framework.views import APIView

class NotificationView(APIView):
    def get(self, request, pk=None):
        try:
            if pk:
                notification = NotificationModel.objects.get(pk=pk)
                notification_ser = NotificationSerializer(notification)
                return Response({
                    'status': 'success',
                    'data': notification_ser.data
                }, status=status.HTTP_200_OK)
            notifications = NotificationModel.objects.all()
            notification_ser = NotificationSerializer(notifications, many=True)
            return Response({
                'status': 'success',
                'data': notification_ser.data
            }, status=status.HTTP_200_OK)
        except NotificationModel.DoesNotExist:
            return Response({
                'status': 'failed',
                'data': 'data not exist with that id'
            }, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({
                'status': 'failed',
                'message': 'something went wrong',
                'error': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def post(self, request):
        try:
            notification_ser = NotificationSerializer(data=request.data)
            if notification_ser.is_valid():
                notification_ser.save()
                return Response({
                    'status': 'success',
                    'data': notification_ser.data
                }, status=status.HTTP_201_CREATED)
            return Response({
                'status': 'failed',
                'data': notification_ser.errors
            }, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({
                'status': 'failed',
                'message': 'something went wrong',
                'error': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def put(self, request, pk):
        try:
            notification = NotificationModel.objects.get(pk=pk)
            notification_ser = NotificationSerializer(notification, data=request.data)
            if notification_ser.is_valid():
                notification_ser.save()
                return Response({
                    'status': 'success',
                    'data': notification_ser.data
                }, status=status.HTTP_200_OK)
            return Response({
                'status': 'failed',
                'data': notification_ser.errors
            }, status=status.HTTP_400_BAD_REQUEST)
        except NotificationModel.DoesNotExist:
            return Response({
                'status': 'failed',
                'data': 'data not exist with that id'
            }, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({
                'status': 'failed',
                'message': 'something went wrong',
                'error': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def delete(self, request, pk):
        try:
            notification = NotificationModel.objects.get(pk=pk)
            notification.delete()
            return Response({
                'status': 'success',
                'message': 'data deleted'
            }, status=status.HTTP_200_OK)
        except NotificationModel.DoesNotExist:
            return Response({
                'status': 'failed',
                'data': 'data not exist with that id'
            }, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({
                'status': 'failed',
                'message': 'something went wrong',
                'error': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)