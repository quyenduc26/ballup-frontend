import api from "@/config/api";
import { ScheduleType } from "@/types/form";

const Schedule = {
  Schedule: (formData: ScheduleType) => api.post("/schedule", formData),
};

export default Schedule;
