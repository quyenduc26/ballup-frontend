    import api from '@/config/api';
    import { FieldDetailType,  } from '@/types/form';

    const FielDetailApi = {
    FieldInfor: (formData: FieldDetailType) => api.post('/owner/center{id}', formData),

    };

    export default FielDetailApi;