import { combineReducers, configureStore } from "@reduxjs/toolkit";
import appearance from "./appearance";
import userSlice from "./user";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

const rootReducer = combineReducers({
    appearance,
    userSlice,
});

const persistConfig = {
    key:"root",
    storage,
    version:1
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer:persistedReducer,
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware({
        serializableCheck:false,
    }),
})
export default store;
export const persistor = persistStore(store);