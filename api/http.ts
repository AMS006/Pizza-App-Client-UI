import { api } from "./api-client";

export const AUTH_SERVICE = '/api/auth';


export const login = async (userData: LoginUserData) => {
    return await api.post(`${AUTH_SERVICE}/auth/login`, userData);
}

export const register = async (userData: RegisterUserData) => {
    return await api.post(`${AUTH_SERVICE}/auth/register`, userData);
}

export const logout = async () => {
    return await api.post(`${AUTH_SERVICE}/auth/logout`);
}

export const getSelf = async () => {
    return await api.get(`${AUTH_SERVICE}/auth/self`);
}

export const getAddress = async () => {
    return await api.get(`${AUTH_SERVICE}/users/address`);
}

export const addAddress = async (address: AddressType) => {
    return await api.post(`${AUTH_SERVICE}/users/address`, address);
}