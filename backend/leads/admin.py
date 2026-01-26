from django.contrib import admin
from .models import Lead


@admin.register(Lead)
class LeadAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'phone', 'source', 'status', 'created_at', 'created_by']
    list_filter = ['status', 'source', 'created_at']
    search_fields = ['name', 'email', 'phone']
    readonly_fields = ['created_at']
