import { createSlice } from '@reduxjs/toolkit'
const getInitialCarts = ()=>{
    const storeCart = localStorage.getItem("cart");
    return storeCart? JSON.parse(storeCart) : [];
}

const saveCartToStorage =(cartItems) =>{
    localStorage.setItem("cart", JSON.stringify(cartItems));


}
const calculateTotals = (cartItems)=>{
    const total = cartItems.reduce((acc, item)=>{

        const itemTotal = item.price *item.quantity;
        acc.totalPrice +=itemTotal;
        acc.totalQuantity += item.quantity;
        return acc;
    },{
        totalPrice : 0,
        totalQuantity : 0,

    }
    )

    total.totalItems = cartItems.length
    return total;

}

const initialCartItems = getInitialCarts();
const initialTotals = calculateTotals(initialCartItems);
const initialState = {
    cartItems : initialCartItems,
    totalQuantity : initialTotals.totalQuantity,
    totalPrice : initialTotals.totalPrice,
    totalItems: initialTotals.totalItems
}

const UpdateStateAndSave = (state) =>{
    const {totalQuantity, totalPrice, totalItems} = calculateTotals(state.cartItems);
    state.totalQuantity = totalQuantity;
    state.totalPrice = totalPrice;
    state.totalItems = totalItems;
    saveCartToStorage(state.cartItems);

}
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers:{
        addToCart:(state, action)=>{
            const product = action.payload;
            const existing = state.cartItems.find(item=> item.id === product.id)
            if(existing){
                existing.quantity += 1;
            }else{
                const { quantity, ...productWithoutQuantity } = product;
                state.cartItems.push({...productWithoutQuantity, quantity: 1});
            }
            UpdateStateAndSave(state);

        },
        incrementQty:(state,action)=>{
            const id = action.payload;
            const item = state.cartItems.find(item => item.id === id);
            if(item){
                item.quantity +=1;

            }
            UpdateStateAndSave(state);

        },
        decrementQty:(state,action)=>{
            const id = action.payload;
            const item = state.cartItems.find(item => item.id === id);
            if(item){
                item.quantity -=1;
                if(item.quantity === 0){
                    state.cartItems = state.cartItems.filter(item => item.id !== id);

                }
                UpdateStateAndSave(state);
            }

        },
        removeItem:(state, action)=>{
            const id = action.payload;
            const item = state.cartItems.find(item => item.id === id) ;
            if(item){
                state.cartItems = state.cartItems.filter(item => item.id !== id);
            }
            UpdateStateAndSave(state);

        },
        clearCart:(state)=>{
            state.cartItems = [];
            state.totalQuantity = 0;
            state.totalPrice = 0;
            state.totalItems = 0;
            localStorage.removeItem("cart");

        }
    }
})
export const {
    addToCart,
    incrementQty,
    decrementQty,
    removeItem,
    clearCart
} = cartSlice.actions;

export default cartSlice.reducer;