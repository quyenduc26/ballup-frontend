import api from '@/config/api'

const ownerApi = {
  getAll: () => api.get('/owner'),
};

export default ownerApi;
