

import { configureStore } from "@reduxjs/toolkit";
import { persistReducer,persistStore} from "redux-persist";
import storage from 'redux-persist/lib/storage';

import authReducer from "./authSlice"


// Configuration for persisting the auth slice
const persistConfig = {
  key: 'auth',  // Key to identify the persisted data
  storage,      // Use localStorage to persist
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);


const store = configureStore({
    reducer: {
      auth: persistedAuthReducer, // Add your auth reducer to the store
    },
  });

  export const persistor = persistStore(store);
  
  export default store;