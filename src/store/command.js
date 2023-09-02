import { createSlice } from "@reduxjs/toolkit";

export const commandSlice = createSlice({
  name: "command",
  initialState: {
    value: "",
  },
  reducers: {
    setCommand: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCommand } = commandSlice.actions;

export default commandSlice.reducer;
