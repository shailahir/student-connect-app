import { AxiosInstance } from "axios";

export class MessagesApi {
  private readonly axiosApiInstance: AxiosInstance;

  constructor(axiosApiInstance: AxiosInstance) {
    this.axiosApiInstance = axiosApiInstance;
  }

  async getMessageTypesMetadata() {
    return this.axiosApiInstance.get(`/v1/metadata/message-types`);
  }

  async getAllMessages() {
    return this.axiosApiInstance.get(`/v1/messages`);
  }

  async getMessageById(id: string | undefined) {
    if (!id) {
      return;
    }

    return this.axiosApiInstance.get(`/v1/messages/${id}`);
  }

  async saveMessage(data: any) {
    return this.axiosApiInstance.post(`/v1/messages`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
