
    import api from '@/config/api';
    import { PlayingCenterType, PlayingSlotType,CardFieldType } from '@/types/form';

    const playingApi = {
      createCreatePlayingCenter: (formData: PlayingCenterType) => api.post('/owner/center', formData),
      createPlayingSlot: (formData: PlayingSlotType) => api.post('/owner/slot', formData ), 
      // cardField: (formData: CardFieldType) => api.post('/center/{id}', formData ), 
      cardField: (id: number) => api.get(`/center/${id}`)

    };

    export default playingApi;
      