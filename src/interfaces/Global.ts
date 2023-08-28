export interface IDataResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface IDataRefreshToken {
  accessToken: string;
  refreshToken: string;
  expiredIn: Date;
}
