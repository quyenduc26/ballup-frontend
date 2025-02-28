import api from '@/config/api'

const ownerApi = {
  getOwner: () => api.get('/owner'),
};

export default ownerApi;
