import axios, { AxiosInstance } from "axios";

export const createHttpsClient = (user?: any): AxiosInstance => {
  const HttpsClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_APP_BASE_URL,
    headers: {
      ...(user && { authorization: user }),
    },
  });

  return HttpsClient;
};
