export interface Authorization {
    tokenType: string;
    accessToken: string;
    refreshToken: string;
    expiresAt?: string;
}

export const emptyAuthorization: Authorization = {
    accessToken: '', refreshToken: '', tokenType: ''
};

export default Authorization;