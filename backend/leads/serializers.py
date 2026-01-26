from rest_framework import serializers
from .models import Lead


class LeadSerializer(serializers.ModelSerializer):
    """
    Serializer for Lead model.
    """
    created_by = serializers.ReadOnlyField(source='created_by.username')
    
    class Meta:
        model = Lead
        fields = ['id', 'name', 'email', 'phone', 'source', 'status', 'created_at', 'created_by']
        read_only_fields = ['id', 'created_at', 'created_by']
