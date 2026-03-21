from django.urls import path
from .views import (
    NoteDetailView,
    NoteListCreateView,
    CategoryListCreateView,
    CategoryDetailView,
)

urlpatterns = [
    path("notes/", NoteListCreateView.as_view(), name="note-list-create"),
    path("notes/<int:pk>/", NoteDetailView.as_view(), name="note-detail"),
    path("categories/", CategoryListCreateView.as_view()),
    path("categories/<int:pk>/", CategoryDetailView.as_view()),
]
