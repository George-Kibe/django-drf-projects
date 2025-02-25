from datetime import datetime

from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def hello_world(request):
    """Hello World Endpoint

    Args:
        request (_type_): _description_

    Returns:
        _type_: _description_
    """
    return Response({"message": f"Hello, world at : {datetime.now().isoformat()}"})