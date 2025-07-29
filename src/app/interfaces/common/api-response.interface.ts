export interface ApiResponse<T> {
  success?: boolean;
  info?: boolean;
  message: string;
  data?: T;
}
    