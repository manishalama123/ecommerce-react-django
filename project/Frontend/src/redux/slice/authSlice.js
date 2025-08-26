import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: null,
    isAuthenticated: false,
    token: null,

}
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            const { access, email, first_name, last_name, username } = action.payload;


            if (access) {
                // ✅ Store the access token in localStorage
                localStorage.setItem('authToken', access);

                // Update the Redux state
                state.isAuthenticated = true;
                state.token = access;
                state.user = {
                    email,
                    first_name,
                    last_name,
                    username,
                };
            } else {
                console.error("Access token not found in login response.");
                state.isAuthenticated = false;
                state.user = null;
                state.token = null;
            }

        },
        logout: (state) => {
            localStorage.removeItem('authToken');

            state.user = null;
            state.isAuthenticated = false;
            state.token = null
        }
    }
})

export const { loginSuccess, logout } = authSlice.actions
export default authSlice.reducer