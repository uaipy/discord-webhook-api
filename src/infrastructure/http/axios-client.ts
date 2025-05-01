/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export interface HttpPostClient {
  post: <T = any>(params: HttpPostClientParams) => Promise<T>;
}

type BaseRequest = {
  url: string;
  config?: AxiosRequestConfig;
};

export interface HttpPostClientParams extends BaseRequest {
  data: any;
}

export class AxiosHttpClient implements HttpPostClient {
  private instance: AxiosInstance;
  constructor(private readonly config?: AxiosRequestConfig) {
    this.instance = axios.create(this.config);
  }
  async post<T = any>(args: HttpPostClientParams): Promise<T> {
    const result: AxiosResponse<T> = await this.instance.post<T>(
      args.url,
      args.data,
      args.config,
    );
    return result.data;
  }
}
