import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    error: null,
    loading : false,
};

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        _setSignInStart: (state) =>{
            state.loading = true;
        },
        _setSignInSuccess:(state,action)=>{
            state.currentUser = action.payload;
            state.loading = false,
            state.error = null
        },
        _setSignInFailure:(state, action)=>{
            state.error = action.payload;
            state.loading = false;
        },
        _setUpdateStart: (state) =>{
            state.loading = true;
        },
        _setUpdateSuccess:(state,action)=>{
            state.currentUser.data.avatar = action.payload;
            state.loading = false,
            state.error = null
        },
        _setUpdateFailure:(state, action)=>{
            state.error = action.payload;
            state.loading = false;
        },
    }
});

export const {_setSignInStart, _setSignInSuccess, _setSignInFailure, _setUpdateStart, _setUpdateSuccess, _setUpdateFailure} = userSlice.actions;
export default userSlice.reducer;
