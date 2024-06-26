import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './features/cart/cartSlice'
import userReducer from './features/user/userSlice'
import orderReducer from './features/order/orderSlice'

export const makeStore = () => {
    return configureStore({
        reducer: {
            cart: cartReducer,
            user: userReducer,
            order: orderReducer,
        }
    })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']