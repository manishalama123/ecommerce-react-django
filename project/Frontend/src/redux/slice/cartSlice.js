// src/features/cart/cartSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the base URL for your Django API
const API_URL = 'http://localhost:8000/api/cart/';

// A helper function to get the token from local storage
const getToken = () => {
    const authData = localStorage.getItem('authToken');
    if (authData) {
        return authData;
    }
    return null;
};

// Async thunks
export const fetchCart = createAsyncThunk('cart/fetchCart', async (_, { rejectWithValue }) => {
    try {
        const token = getToken();
        // Configuration object for Axios with the Authorization header
        const config = token ? {
            headers: {
                Authorization: `Bearer ${token}`
            }
        } : {};
        const response = await axios.get(API_URL, config);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const addItemToCart = createAsyncThunk('cart/addToCart', async (item, { rejectWithValue }) => {
    try {
        const token = getToken();
        if (!token) {
            throw new Error("Authentication token not found.");
        }
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        const response = await axios.post(`${API_URL}add/`, {
            product: item.product,
            quantity: item.quantity
        }, config);

        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});
export const updateCartItem = createAsyncThunk('cart/updateCartItem', async ({ id, quantity, productId }, { rejectWithValue }) => {
    try {
        const token = getToken();
        if (!token) {
            throw new Error("Authentication token not found.");
        }
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        // ✅ Include the productId in the request body
        const response = await axios.put(`${API_URL}update/${id}/`, { product: productId, quantity }, config);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const removeCartItem = createAsyncThunk('cart/removeCartItem', async (id, { rejectWithValue }) => {
    try {
        const token = getToken();
        if (!token) {
            throw new Error("Authentication token not found.");
        }
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        await axios.delete(`${API_URL}remove/${id}/`, config);
        return id;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

const initialState = {
    cartItems: [],
    loading: 'idle', // Renamed 'status' to 'loading' for clarity
    error: null,
};

const calculateTotals = (cartItems) => {
    // This function is fine, but it will be called inside the reducer
    // after the state has been updated by an API call.
    const total = cartItems.reduce((acc, item) => {
        acc.totalPrice += item.price * item.quantity;
        acc.totalQuantity += item.quantity;
        return acc;
    }, { totalPrice: 0, totalQuantity: 0 });

    total.totalItems = cartItems.length;
    return total;
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    // The `reducers` section is removed because we will only update state
    // based on the async thunk results from the backend.

    extraReducers: (builder) => {
        builder
            // --- Handlers for fetching the cart ---
            .addCase(fetchCart.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.cartItems = action.payload; // Update the state with the server data
                const { totalPrice, totalQuantity, totalItems } = calculateTotals(state.cartItems);
                state.totalPrice = totalPrice;
                state.totalQuantity = totalQuantity;
                state.totalItems = totalItems;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.error.message;
            })

            // --- Handlers for adding an item ---
            .addCase(addItemToCart.fulfilled, (state, action) => {
                const newCartItem = action.payload; // from backend
                if (!Array.isArray(state.cartItems)) {
                    state.cartItems = [];
                }
            
                const existing = state.cartItems.find(
                    item => item.product === newCartItem.product  // use product ID, not product_details
                );
            
                if (existing) {
                    existing.quantity = newCartItem.quantity;
                } else {
                    state.cartItems.push(newCartItem);
                }
            
                const { totalPrice, totalQuantity, totalItems } = calculateTotals(state.cartItems);
                state.totalPrice = totalPrice;
                state.totalQuantity = totalQuantity;
                state.totalItems = totalItems;
            })
            

            // --- Handlers for updating an item ---
            .addCase(updateCartItem.fulfilled, (state, action) => {
                const updatedItem = action.payload;
                const index = state.cartItems.findIndex(item => item.id === updatedItem.id);
                if (index !== -1) {
                    state.cartItems[index] = updatedItem; // Replace the item with the updated version
                }
                const { totalPrice, totalQuantity, totalItems } = calculateTotals(state.cartItems);
                state.totalPrice = totalPrice;
                state.totalQuantity = totalQuantity;
                state.totalItems = totalItems;
            })

            // --- Handlers for removing an item ---
            .addCase(removeCartItem.fulfilled, (state, action) => {
                const removedId = action.payload;
                state.cartItems = state.cartItems.filter(item => item.id !== removedId);
                const { totalPrice, totalQuantity, totalItems } = calculateTotals(state.cartItems);
                state.totalPrice = totalPrice;
                state.totalQuantity = totalQuantity;
                state.totalItems = totalItems;
            })

            // You should also add pending and rejected cases for each thunk
            // to show loading states and handle errors for each action.
            // Example for addItemToCart:
            .addCase(addItemToCart.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(addItemToCart.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.error.message;
            });
    },
});

export default cartSlice.reducer;