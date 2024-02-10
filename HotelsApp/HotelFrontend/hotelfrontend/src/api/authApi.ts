import { apiClient } from "./apiClient";

export const apiLogin = async (data: {username: string, password: string}) => {
    return await apiClient.post('/auth/login/', data);
};

export const apiRegister = async (data: { username: string, password: string, email: string }) => {
    return await apiClient.post('/auth/register/', data);
};

export const apiChangePassword = async (data: { oldPassword: string, newPassword: string }) => {
    return await apiClient.post('/auth/changepassword/', data);
};

export const apiGetLoggedUser = async () => {
    return await apiClient.get('/auth/getloggeduser/');
};