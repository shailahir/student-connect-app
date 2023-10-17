import { AxiosInstance } from "axios";

export class MetadataApi {
  private readonly axiosApiInstance: AxiosInstance;

  constructor(axiosApiInstance: AxiosInstance) {
    this.axiosApiInstance = axiosApiInstance;
  }

  async getMessageTypesMetadata() {
    return this.axiosApiInstance.get(`/v1/metadata/message-types`);
  }
}
