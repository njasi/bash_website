import { createSlice } from "@reduxjs/toolkit";
import welcomeMessage from "../config"
export const outputSlice = createSlice({
  name: "output",
  initialState: {
    history: [
      {
        prompt: { user: "user", host: "computer" },
        command: "ssh guest@njasi.com",
        result: welcomeMessage,
      },
    ],
  },
  reducers: {
    clearOutput: (state) => {
      state.history = [];
    },
    addOutput: (state, action) => {
      state.history.push(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { clearOutput, addOutput } = outputSlice.actions;

export default outputSlice.reducer;
