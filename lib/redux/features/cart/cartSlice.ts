import { hashItem } from "@/lib/utils";
import { createSlice } from "@reduxjs/toolkit";

export interface CartItem extends Pick<Product, "_id" | "name" | "image" | "priceConfiguration"> {

    chosenConfiguration: {
        priceConfiguration: {
            [key: string]: string;
        };
        selectedToppings: Topping[];
    };
    qty: number;
    hash?: string;
    totalPrice: number;
}

export interface CartState {
    cartItems: CartItem[];
}

const initialState: CartState = {
    cartItems: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(state, action) {
            state.cartItems.push({ ...action.payload, qty: 1, hash: hashItem(action.payload) });
        },
        setInitialCartItems(state, action) {
            state.cartItems = action.payload;
        },
        incrementQty(state, action) {
            const itemIndex = state.cartItems.findIndex((item) => item.hash === action.payload);

            const totalPrice = state.cartItems[itemIndex].totalPrice / state.cartItems[itemIndex].qty;
            state.cartItems[itemIndex].qty += 1;
            state.cartItems[itemIndex].totalPrice = totalPrice * state.cartItems[itemIndex].qty;

            localStorage.setItem("cart", JSON.stringify(state.cartItems));

        },
        decrementQty(state, action) {
            const itemIndex = state.cartItems.findIndex((item) => item.hash === action.payload);
            const currQty = state.cartItems[itemIndex].qty;
            if (currQty === 1) {
                return;
            }
            const totalPrice = state.cartItems[itemIndex].totalPrice / state.cartItems[itemIndex].qty;
            state.cartItems[itemIndex].qty -= 1;
            state.cartItems[itemIndex].totalPrice = totalPrice * state.cartItems[itemIndex].qty;

            localStorage.setItem("cart", JSON.stringify(state.cartItems));
        },
        removeItem(state, action) {
            state.cartItems = state.cartItems.filter((item) => item.hash !== action.payload);

            localStorage.setItem("cart", JSON.stringify(state.cartItems));
        },
    },
});

export const { addToCart, setInitialCartItems, incrementQty, decrementQty, removeItem } = cartSlice.actions;

export default cartSlice.reducer;