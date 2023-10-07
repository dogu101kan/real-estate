import { configureStore } from "@reduxjs/toolkit";
import appearance from "./appearance";
import userSlice from "./user";

const store = configureStore({
    reducer:{
        appearance,
        userSlice,
    }
})

export default store;