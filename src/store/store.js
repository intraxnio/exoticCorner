import { configureStore } from "@reduxjs/toolkit";
import brandReducer from './brandSlice';
import creatorReducer from './creatorSlice';
import cartReducer from './cartSlice';

const persistedStateJSON = localStorage.getItem("influencerDetails");
const persistedState = persistedStateJSON
  ? JSON.parse(persistedStateJSON)
  : {};

  const brandPersistedStateJSON = localStorage.getItem("brandDetails");
  const brandPersistedState = brandPersistedStateJSON
    ? JSON.parse(brandPersistedStateJSON)
    : {};

    const cartPersistedState = JSON.parse(localStorage.getItem("exoticCart")) || [];


const store = configureStore({
    reducer: {
        brandUser: brandReducer,
        creatorUser: creatorReducer,
        cart: cartReducer,

    },
    preloadedState: {
        creatorUser: persistedState,
        brandUser: brandPersistedState,
        cart: cartPersistedState,
    },

})

export default store;