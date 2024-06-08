import { createSlice } from "@reduxjs/toolkit";
import { clear } from "console";

export interface OrderData {
    selectedAddress?: AddressType;
    paymentMethod?: string;
    comment?: string;

}

export interface OrderState {
    orderData: OrderData;
    allOrders?: OrderType[];
    selectedOrder?: OrderType;
}

const initialState: OrderState = {
    orderData: {},
};

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        setSelectedAddress(state, action) {
            state.orderData.selectedAddress = action.payload;
        },
        setPaymentMethod(state, action) {
            state.orderData.paymentMethod = action.payload;
        },
        setComment(state, action) {
            state.orderData.comment = action.payload;
        },
        clearOrderData(state) {
            state.orderData = {};
        },
        setAllOrders(state, action) {
            state.allOrders = action.payload;
        },
        setSelectedOrder(state, action) {
            console.log('action.payload', action.payload);
            state.selectedOrder = action.payload;
        }
    },
});

export const { setSelectedAddress, setPaymentMethod, setComment, setAllOrders, setSelectedOrder } = orderSlice.actions;

export default orderSlice.reducer;