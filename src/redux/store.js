import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice"
import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage/index.js";
import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice";




// ✅ Use localStorage directly instead of redux-persist storage
const storage = {
  getItem: (key) => Promise.resolve(localStorage.getItem(key)),
  setItem: (key, value) => Promise.resolve(localStorage.setItem(key, value)),
  removeItem: (key) => Promise.resolve(localStorage.removeItem(key)),
};


const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart", "auth"], // <- only persist cart and auth
};

// combineReducers
const rootReducer = combineReducers({
  cart: cartReducer,
  auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

// export const store = configureStore({
//   reducer: {
//     cart: cartReducer,
//   },
// });