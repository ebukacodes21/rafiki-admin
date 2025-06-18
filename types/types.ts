export type User = {
  id: string;
  email: string;
  isVerified: boolean;
  isOnboarded: boolean;
  role: string;
  createdAt: Date;
};

export type InitialUserState = {
  isLoading: boolean;
  isError: boolean;
  user: User | null;
};
