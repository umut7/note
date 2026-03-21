from django.shortcuts import render
from .models import Notes, Category
from .serializer import NoteSerializer, CategorySerializer
from rest_framework import generics


class NoteListCreateView(generics.ListCreateAPIView):
    queryset = Notes.objects.all().order_by("-created_at")
    serializer_class = NoteSerializer

    def get_queryset(self):
        queryset = Notes.objects.all().order_by("-created_at")
        category = self.request.query_params.get("category")
        if category:
            queryset = queryset.filter(category_id=category)
        return queryset


class NoteDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Notes.objects.all()
    serializer_class = NoteSerializer


class CategoryListCreateView(generics.ListCreateAPIView):
    queryset = Category.objects.all().order_by("name")
    serializer_class = CategorySerializer


class CategoryDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
