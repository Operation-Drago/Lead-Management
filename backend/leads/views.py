from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Lead
from .serializers import LeadSerializer


class LeadViewSet(viewsets.ModelViewSet):
    """
    ViewSet for Lead CRUD operations.
    All endpoints require JWT authentication.
    """
    serializer_class = LeadSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """
        Return leads created by the authenticated user.
        """
        return Lead.objects.filter(created_by=self.request.user)

    def perform_create(self, serializer):
        """
        Set the created_by field to the authenticated user.
        """
        serializer.save(created_by=self.request.user)
