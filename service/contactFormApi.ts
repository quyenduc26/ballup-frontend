import api from '@/config/api';

const feedbackApi = {
  PostFeedbackApi: (data: any) => api.post('/contact/feedback', data, {
    headers: {
      "Content-Type": "application/json",
    },
  }),
  
  GetFeedbackApi: () => api.get('/contact/feedbacks'),
};

export default feedbackApi;
