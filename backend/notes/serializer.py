from rest_framework import serializers
from .models import Notes, Category


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name"]


class NoteSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        source="category",
        write_only=True,
        allow_null=True,
    )

    class Meta:
        model = Notes
        fields = ["id", "title", "description", "created_at", "category", "category_id"]
