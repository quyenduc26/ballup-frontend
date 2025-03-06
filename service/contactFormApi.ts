import api from '@/config/api';

const feedbackApi = {
  PostFeedbackApi: (data: any) => api.post('/contact/feedback', data),
  
  GetFeedbackApi: () => api.get('/contact/feedbacks'),
};

export default feedbackApi;