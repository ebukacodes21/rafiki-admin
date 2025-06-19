export type User = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: string
  country: string;
  isOnboarded: boolean;
  isVerified: boolean;
  createdAt: string; 
};


export type InitialUserState = {
  isLoading: boolean;
  isError: boolean;
  user: User | null;
};
