from django.contrib import admin
from .models import Notes, Category


@admin.register(Notes)
class NotesAdmin(admin.ModelAdmin):
    verbose_name = "Note"


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    pass
