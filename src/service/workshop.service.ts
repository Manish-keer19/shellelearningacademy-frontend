import axiosInstance from "./axiosInstance";

class WorkshopService {
    // Get all workshops (public)
    public async getAllWorkshops() {
        try {
            const res = await axiosInstance.get(`/workshop/getAllWorkshops`);
            return res.data;
        } catch (error: any) {
            throw error;
        }
    }

    // Get workshop details (public/authenticated)
    public async getWorkshopDetails(workshopId: string) {
        try {
            const res = await axiosInstance.post(`/workshop/getWorkshopDetails`, { workshopId });
            return res.data;
        } catch (error: any) {
            throw error;
        }
    }

    // Admin: Create workshop
    public async createWorkshop(data: FormData, token: string) {
        try {
            const res = await axiosInstance.post(`/workshop/createWorkshop`, data, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            });
            return res.data;
        } catch (error: any) {
            throw error;
        }
    }

    // Student: Enroll in workshop
    public async enrollWorkshop(workshopId: string, token: string) {
        try {
            const res = await axiosInstance.post(`/workshop/enrollWorkshop`, { workshopId }, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            return res.data;
        } catch (error: any) {
            throw error;
        }
    }
}

export const workshopService = new WorkshopService();
