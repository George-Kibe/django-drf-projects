from django.http import JsonResponse

def health_check(request):
    return JsonResponse({
        "Server Status": "Running Healthy","Server Message": "Stop Doubting Server Fix your Code Issues"
        }, status=200)
