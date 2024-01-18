import { useAuthStore } from "@/store/Store";
import { createHttpsClient } from "./https-client";
import { toast } from "react-hot-toast";

const authService = {
  signup: async (formData:any,onSuccess:()=> void) => {
    try {
      const httpClient = createHttpsClient();
      const response = await httpClient.post("/auth/signup", formData);
      toast.success("Signup successful!");
      onSuccess();
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },
  signin: async (formData:any,onSuccess:()=> void) => {
    try {
      const httpClient = createHttpsClient();
      const response = await httpClient.post("/auth/signin", formData);
      localStorage.setItem('token',`Bearer ${response.data.token}`);
      useAuthStore.getState().setToken(`Bearer ${response.data.token}`);
      toast.success("Signin successful!");
      onSuccess();
    } catch (error: any) {
      throw error;
    }
  },
};

export default authService;
