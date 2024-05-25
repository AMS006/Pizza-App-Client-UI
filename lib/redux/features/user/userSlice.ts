import { getSelf } from "@/api/http";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const fetchUserDetails = createAsyncThunk('user/fetchUserDetails', async () => {
    const response = await getSelf();
    return response.data;
});

export interface UserState {
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    user: {
        firstName: string;
        lastName: string;
        role: string;
        email: string;
        address: AddressType[];
    };
}

const initialState: UserState = {
    status: 'idle',
    user: {
        firstName: "",
        lastName: "",
        role: "",
        email: "",
        address: []
    }
}



const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
        },
        logout(state) {
            state.user = {
                firstName: "",
                lastName: "",
                role: "",
                email: "",
                address: []
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserDetails.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUserDetails.fulfilled, (state, action) => {
                state.status = 'succeeded';
                console.log(action.payload);
                state.user = action.payload;
            })
            .addCase(fetchUserDetails.rejected, (state, action) => {
                state.status = 'failed';
            });

    }
})

export const { setUser, logout } = userSlice.actions;

export default userSlice.reducer;