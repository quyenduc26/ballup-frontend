
    import api from '@/config/api';
    import { PlayingCenterType, PlayingSlotType } from '@/types/form';

    const playingApi = {
      createCreatePlayingCenter: (formData: PlayingCenterType) => api.post('/owner/center', formData),
      createPlayingSlot: (formData: PlayingSlotType) => api.post('/owner/slot', formData ), 
      getAllCenter: () => api.get('/center' ), 
      getCenterInfor: (id: string) => api.get(`/center/${id}`),


     

    };

    export default playingApi;
      