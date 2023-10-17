import { AxiosInstance } from "axios";

export class SchedulesApi {
  private readonly axiosApiInstance: AxiosInstance;

  constructor(axiosApiInstance: AxiosInstance) {
    this.axiosApiInstance = axiosApiInstance;
  }

  async getAllSchedules() {
    return this.axiosApiInstance.get(`/v1/messages/schedules`);
  }

  async getScheduleById(id: string | undefined) {
    if (!id) {
      return;
    }

    return this.axiosApiInstance.get(`/v1/messages/schedules/${id}`);
  }

  async getMessageByScheduleId(id: string | undefined) {
    if (!id) {
      return;
    }

    return this.axiosApiInstance.get(`/v1/messages/schedules/${id}/messages`);
  }
}
