export interface User {
  $id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface AppwriteError {
  message: string;
  code: number;
}

// Tipe untuk parameter useAppwrite
export interface UseAppwriteOptions<T, P extends Record<string, string | number>> {
  fn: (params?: P) => Promise<T>;
  params?: P;
  skip?: boolean;
}

// Tipe untuk return value useAppwrite
export interface UseAppwriteReturn<T, P> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: (newParams?: P) => Promise<void>;
}
