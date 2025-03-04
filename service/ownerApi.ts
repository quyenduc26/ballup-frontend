import api from '@/config/api'

const ownerApi = {
  getOwner: () => api.get('/owner'),
  getOwnerCenter: (ownerId: number) => api.get(`/owner/${ownerId}/centers`),
};

export default ownerApi;
