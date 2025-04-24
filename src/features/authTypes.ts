// src/features/auth/authTypes.ts

export interface User {
  id: number;
  username: string;
  email: string;
  token: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}
