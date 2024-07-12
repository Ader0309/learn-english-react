import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState = { auth: false, name: null, email: null };

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login(state, action) {
            state.auth = true;
            state.name = action.payload.name;
            state.email = action.payload.email;
        },
        logout(state) {
            state.auth = false;
            state.name = null;
            state.email = null;
        },
    },
});

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
    },
});

export const authActions = authSlice.actions;

export default store;
