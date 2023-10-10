import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    _setSignInStart: (state) => {
      state.loading = true;
    },
    _setSignInSuccess: (state, action) => {
      state.currentUser = action.payload;
      (state.loading = false), (state.error = null);
    },
    _setSignInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    _setUpdateStart: (state) => {
      state.loading = true;
    },
    _setUpdateSuccess: (state, action) => {
      state.currentUser.data.avatar = action.payload;
      (state.loading = false), (state.error = null);
    },
    _setUpdateFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    _setUpdateInformationStart: (state) => {
      state.loading = true;
    },
    _setUpdateInformationSuccess: (state, action) => {
      state.currentUser.data = action.payload;
      (state.loading = false), (state.error = null);
    },
    _setUpdateInformationFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    _setDeleteAccountStart: (state) => {
      state.loading = true;
    },
    _setDeleteAccountSuccess: (state) => {
      state.currentUser = null;
      (state.loading = false), (state.error = null);
    },
    _setDeleteAccountFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    _setLogoutStart: (state) => {
      state.loading = true;
    },
    _setLogoutSuccess: (state) => {
      state.currentUser = null;
      (state.loading = false), (state.error = null);
    },
    _setLogoutFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  _setSignInStart,
  _setSignInSuccess,
  _setSignInFailure,
  _setUpdateStart,
  _setUpdateSuccess,
  _setUpdateFailure,
  _setUpdateInformationStart,
  _setUpdateInformationSuccess,
  _setUpdateInformationFailure,
  _setDeleteAccountStart,
  _setDeleteAccountSuccess,
  _setDeleteAccountFailure,
  _setLogoutStart,
_setLogoutSuccess,
_setLogoutFailure,
} = userSlice.actions;
export default userSlice.reducer;
