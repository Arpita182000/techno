import axios from 'axios';
import { AnyNsRecord } from 'dns';

class ApiService {
  private static instance: ApiService;

  private constructor() {}

  static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  async callGetApi(url: string) {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error:any) {
      throw new Error(error?.response?.data?.message || 'An error occurred');
    }
  }

  async callPostApi(url: string, payload: any) {
    try {
      const response = await axios.post(url, payload);
      return response;
    } catch (error: any) {
      throw new Error(error?.response?.data?.message || 'An error occurred');
    }
  }

  // Other API methods here...
  async scheduleputApi(url: string, payload: any) {
    try {
      const response = await axios.put(url, payload);
      return response;
    } catch (error: any) {
      throw new Error(error?.response?.data?.message || 'An error occurred');
    }
  }

  async editorputApi(url: string, payload: AnyNsRecord) {
    try {
      const response = await axios.put(url, payload);
      return response;
    } catch (error: any) {
      throw new Error(error?.response?.data?.message || 'An error occurred');
    }
  }




}

export default ApiService.getInstance();
