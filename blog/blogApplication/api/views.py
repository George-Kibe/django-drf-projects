from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from .models import BlogPost
from .serializers import BlogPostSerializer
from rest_framework.views import APIView

class BlogPostListCreate(generics.ListCreateAPIView):
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostSerializer

    def delete(self, request, *args, **kwargs):
        BlogPost.objects.all().delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class BlogPostRetrieveUpdateDestory(generics.RetrieveUpdateDestroyAPIView):
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostSerializer
    lookup_field = "pk"


class BlogPostView(APIView):
    def get(self, request, *args, **kwargs):
        # Get title from the query parameter if no resort to empty string
        title = request.query_params.get("title", "")
        if title:
            # filter query set based on the title
            blog_posts = BlogPost.objects.filter(title__icontains=title)
        else:
            # if no title is provided, return all blog posts
            blog_posts = BlogPost.objects.all()
        serializer = BlogPostSerializer(blog_posts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        serializer = BlogPostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)