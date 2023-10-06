import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  backgroundColor: {
    name: "light",
    primary: "#FFFFFF",
    secondary: "#000000"
  },
  color: {
    primary: "#191BA9",
    secondary: "#333333",
    base: "#555555",
    baseSecondary: "#333333",
  },
  boxShadow:
    "rgba(255,255,255,0.2) 0px 0px 15px, rgba(255,255,255,0.15) 0px 0px 3px 1px",
};

const appearance = createSlice({
  name: "appearance",
  initialState,
  reducers: {
    _setBackgroundColor: (state, action) => {
      state.backgroundColor = action.payload;
    },
    _setColor: (state, action) => {
      state.color = action.payload;
    },
    _setBoxShadow: (state, action) => {
      state.boxShadow = action.payload;
    },
  },
});

export const { _setBackgroundColor, _setColor, _setBoxShadow } = appearance.actions;

export default appearance.reducer;
