import { api } from "./api-client";

export const AUTH_SERVICE = '/api/auth';
export const ORDER_SERVICE = '/api/order';


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
    return await api.get(`${ORDER_SERVICE}/address`);
}

export const addAddress = async (address: AddressType) => {
    return await api.post(`${ORDER_SERVICE}/address`, address);
}

// Orders

export const placeOrder = async (order: OrderType) => {
    return await api.post(`${ORDER_SERVICE}/order`, order);
}

export const validateCoupon = async (couponCode: string) => {

    return await api.post(`${ORDER_SERVICE}/coupon/apply`, { couponCode });
}

export const getUserOrders = async () => {
    return await api.get(`${ORDER_SERVICE}/order/user`);
}

export const cancelOrder = async (id: string, cancelReason: string) => {
    return await api.post(`${ORDER_SERVICE}/order/cancel/${id}`, { cancelReason });
}

// export const searchProduct = async (id: string,)