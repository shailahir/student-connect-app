import { AxiosInstance } from "axios";

export class GroupsApi {
  private readonly axiosApiInstance: AxiosInstance;

  constructor(axiosApiInstance: AxiosInstance) {
    this.axiosApiInstance = axiosApiInstance;
  }

  async getAllGroups() {
    return this.axiosApiInstance.get(`/v1/student-groups`);
  }

  async saveGroupDetails(data: any) {
    return this.axiosApiInstance.post(`/v1/student-groups`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async updateGroupDetails(data: any) {
    return this.axiosApiInstance.put(`/v1/student-groups`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async getGroupInfoById(id: string | undefined) {
    if (!id) {
      return;
    }

    return this.axiosApiInstance.get(`/v1/student-groups/${id}`);
  }

  async deleteGroupById(id: string | undefined) {
    if (!id) {
      return;
    }

    return this.axiosApiInstance.delete(`/v1/student-groups/${id}`);
  }

  async getStudentsByGroupId(id: string | undefined) {
    if (!id) {
      return;
    }

    return this.axiosApiInstance.get(
      `/v1/student-groups-membership/students-for-group/${id}`
    );
  }

  async updateGroupMembershipsByRollNumber(data: any) {
    return this.axiosApiInstance.put(
      `/v1/student-groups-membership/groups-for-student`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  async updateGroupMembershipsByGroupId(data: any) {
    return this.axiosApiInstance.put(
      `/v1/student-groups-membership/students-for-group`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
