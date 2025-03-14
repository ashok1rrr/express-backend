export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data?: T;
    error?: any;
  }
  
  export interface UserPayload {
    userId: string;
  }
  
  export interface Task {
    _id: string;
    title: string;
    description?: string;
    user: string;
    createdAt: string;
  }
  