// src/features/cart/cartSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the base URL for your Django API
const API_URL = 'http://localhost:8000/api/cart/';

// Async thunks (these look good and don't need changes)
export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
    const response = await axios.get(API_URL);
    return response.data;
});

export const addItemToCart = createAsyncThunk('cart/addToCart', async (item) => {
    const response = await axios.post(`${API_URL}add/`, item);
    return response.data;
});

export const updateCartItem = createAsyncThunk('cart/updateCartItem', async ({ id, quantity }) => {
    const response = await axios.put(`${API_URL}update/${id}/`, { quantity });
    return response.data;
});

export const removeCartItem = createAsyncThunk('cart/removeCartItem', async (id) => {
    await axios.delete(`${API_URL}remove/${id}/`);
    return id; // The ID of the item that was removed
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
                // The backend should return the updated cart or the new item.
                // Here, we'll assume it returns the new item.
                const newItem = action.payload;
                const existing = state.cartItems.find(item => item.id === newItem.id);

                if (existing) {
                    existing.quantity = newItem.quantity; // Update quantity
                } else {
                    state.cartItems.push(newItem); // Add new item
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