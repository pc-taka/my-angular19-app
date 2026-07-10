export interface LoginAPIUser {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    image: string;
    roles?: string[];
  }

export interface LoginAPIResponse extends LoginAPIUser {
    accessToken: string;
    refreshToken: string;
}

export interface LoginAPIRequest {
    username: string;
    password: string;
    expiresInMins: number;
}