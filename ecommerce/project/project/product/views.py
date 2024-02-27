from rest_framework import viewsets
from .serializers import BrandSerializer, CategorySerializer, ProductSerializer
from .models import Brand, Category, Product
from rest_framework.response import Response


# Create your views here.
class BrandViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows brands to be viewed or edited.
    """

    queryset = Brand.objects.all()
    serializer_class = BrandSerializer

    def list(self, request):
        serializer = BrandSerializer(self.queryset, many=True)
        return Response(serializer.data)


class CategoryViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows categories to be viewed or edited.
    """

    queryset = Category.objects.all().order_by("name")
    serializer_class = CategorySerializer

    def list(self, request):
        serializer = CategorySerializer(self.queryset, many=True)
        return Response(serializer.data)


class ProductViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows products to be viewed or edited.
    """

    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def list(self, request):
        serializer = ProductSerializer(self.queryset, many=True)
        return Response(serializer.data)
