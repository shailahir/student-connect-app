import { AxiosInstance } from "axios";

export class StudentApi {
  private readonly axiosApiInstance: AxiosInstance;

  constructor(axiosApiInstance: AxiosInstance) {
    this.axiosApiInstance = axiosApiInstance;
  }

  async getAllStudents() {
    return this.axiosApiInstance.get(`/v1/students`);
  }

  async getStudentByRollNumber(rollNumber: string | undefined) {
    if (!rollNumber) {
      return;
    }

    return this.axiosApiInstance.get(`/v1/students/${rollNumber}`);
  }

  async getGroupsByRollNumber(rollNumber: string | undefined) {
    if (!rollNumber) {
      return;
    }

    return this.axiosApiInstance.get(
      `/v1/student-groups-membership/groups-for-student/${rollNumber}`
    );
  }

  async saveStudentDetails(data: any) {
    return this.axiosApiInstance.post(`/v1/students`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async updateStudentDetails(data: any) {
    return this.axiosApiInstance.put(`/v1/students`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async deleteStudent(rollNumber: any) {
    return this.axiosApiInstance.delete(`/v1/students/${rollNumber}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
