import { createSlice } from "@reduxjs/toolkit";

const storedState = JSON.parse(localStorage.getItem("exoticCart"));

const cartSlice = createSlice({
  name: "cart",
  initialState: storedState || [],
  reducers: {
    // addToCart: (state, action) => {
    //   const newItem = action.payload;
    //   const existingItem = state.find(item => item.product_id === newItem.product_id);

    //   if (existingItem) {
    //     // If the item already exists in the cart, update its quantity
    //     existingItem.quantity += newItem.quantity;
    //   } else {
    //     // If the item doesn't exist, add it to the cart
    //     state.push(newItem);
    //   }

    //   localStorage.setItem("exoticCart", JSON.stringify(state));
    // },

    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItemIndex = state.findIndex(item => item.product_id === newItem.product_id);
    
      if (existingItemIndex !== -1) {
        // If the item already exists in the cart, update its quantity
        state[existingItemIndex].quantity += newItem.quantity;
      } else {
        // If the item doesn't exist, add it to the cart
        state.push(newItem);
      }
    
      localStorage.setItem("exoticCart", JSON.stringify(state));
    },
   
    removeFromCart: (state, action) => {
      const productId = action.payload.productId;
      const updatedState = state.map(item => {
        if (item.product_id === productId) {
          if (item.quantity > 1) {
            // If the quantity of the item is greater than 0, decrement the quantity
            return {
              ...item,
              quantity: item.quantity - 1
            };
          } else {
            // If the quantity is 0, remove the item from the cart
            // return state.filter(item => item.product_id !== productId);
            return null;
          }
        } else {
          return item;
        }
      }).filter(Boolean); // Filter out null items
      
      localStorage.setItem("exoticCart", JSON.stringify(updatedState));
      
      return updatedState;
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
