import axios, { AxiosInstance, AxiosStatic, Method } from "axios";
import { IDataRefreshToken, IDataResponse } from "../interfaces/Global";
import { getEnvironment } from "../common/helpers/utils";
import {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
} from "../common/constants/localStorageKeys";

declare module "axios" {
  export interface AxiosInstance {
    request<T = any>(config: AxiosRequestConfig): Promise<T>;
    get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
    delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
    head<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
    post<T = any>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig
    ): Promise<T>;
    put<T = any>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig
    ): Promise<T>;
    patch<T = any>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig
    ): Promise<T>;
  }
}

export class HttpService {
  private readonly axios: AxiosInstance;
  public accessToken: string | undefined = "";
  public refreshToken: string | undefined = "";

  constructor(axios: AxiosStatic) {
    this.axios = axios.create({
      baseURL: (window as any).BASE_URL || "http://localhost:3000",
    });

    this.axios.interceptors.response.use(
      (res) => {
        return res.data;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  setToken(token: string) {
    this.accessToken = token;
    this.axios.defaults.headers.common.Authorization = token;

    if (getEnvironment() === "browser") {
      window.localStorage.setItem(ACCESS_TOKEN, token);
    }
  }

  setRefreshToken(token: string) {
    this.refreshToken = token;

    if (getEnvironment() === "browser") {
      window.localStorage.setItem(REFRESH_TOKEN, token);
    }
  }

  async requestRefreshToken(token: string): Promise<IDataRefreshToken | null> {
    try {
      const { data } = await this.post<IDataRefreshToken>("/auth/refresh", {
        token: token || this.refreshToken,
      });

      this.setToken(data.accessToken);
      this.setRefreshToken(data.refreshToken);

      return data;
    } catch (error) {
      return null;
    }
  }

  request<T = any>(method: Method, url: string, data: any) {
    return this.axios.request<T>({
      method: method,
      url: url,
      data: data,
    });
  }

  get<T = any>(url: string, params?: Record<any, any>): Promise<T> {
    return this.axios.get<T>(url, {
      params,
    });
  }

  post<T = any>(url: string, data: any): Promise<IDataResponse<T>> {
    return this.axios.post<IDataResponse<T>>(url, data);
  }

  put<T = any>(url: string, data: any): Promise<IDataResponse<T>> {
    return this.axios.put<IDataResponse<T>>(url, data);
  }

  patch<T = any>(url: string, data: any): Promise<IDataResponse<T>> {
    return this.axios.patch<IDataResponse<T>>(url, data);
  }
}

export const httpService = new HttpService(axios);
