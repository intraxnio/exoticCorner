import { createSlice } from "@reduxjs/toolkit";

const storedState = JSON.parse(localStorage.getItem("exoticCart"));

const cartSlice = createSlice({
  name: "cart",
  initialState: storedState || [],
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.find(item => item.product_id === newItem.product_id);

      if (existingItem) {
        // If the item already exists in the cart, update its quantity
        existingItem.quantity += newItem.quantity;
      } else {
        // If the item doesn't exist, add it to the cart
        state.push(newItem);
      }

      localStorage.setItem("exoticCart", JSON.stringify(state));
    },
    removeFromCart: (state, action) => {
      const productId = action.payload.productId;
      return state.filter(item => item.product_id !== productId);
    },
    updateCartItemQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const itemToUpdate = state.find(item => item.product_id === productId);
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
        localStorage.setItem("exoticCart", JSON.stringify(state));
      }
    },

    clearCart: (state) => {
      localStorage.removeItem("exoticCart");
      return [];

    },

  },
});

export const { addToCart, removeFromCart, updateCartItemQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
