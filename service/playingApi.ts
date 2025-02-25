
import api from '@/config/api';
import { PlayingCenterType, PlayingSlotType,FieldDetailType} from '@/types/form';

const playingApi = {
  createPlayingCenter: (formData: PlayingCenterType) => api.post('/owner/center', formData),
  createPlayingSlot: (formData: PlayingSlotType) => api.post('/owner/slot', formData ), 
  FieldInfor: (formData: FieldDetailType) => api.post('/center/{id}', formData),

};

export default playingApi;
  