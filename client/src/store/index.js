import { configureStore } from "@reduxjs/toolkit";
import appearance from "./appearance";

const store = configureStore({
    reducer:{
        appearance
    }
})

export default store;