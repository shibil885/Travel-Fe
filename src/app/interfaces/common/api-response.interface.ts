export interface ApiResponse<T> {
  success?: boolean;
  warning?: boolean;
  info?: boolean;
  message: string;
  data?: T;
}
