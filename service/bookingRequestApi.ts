import api from '@/config/api';

const takeslotApi = {
    takeSlot: () => api.post('/slot/takeSlot'),
};

export default takeslotApi;
