import { createSlice } from "@reduxjs/toolkit";

export const outputSlice = createSlice({
  name: "output",
  initialState: {
    history: [
      {
        prompt: { user: "user", host: "computer" },
        command: "ssh guest@njasi.com",
        result: `
Welcome to Nick Jasinski's Website

* (class=green)(Github):         [https://github.com/njasi](https://github.com/njasi)
* (class=green)(Linkedin):       [https://www.linkedin.com/in/njasi](https://www.linkedin.com/in/njasi)
* (class=green)(Email):          [nick@jasinski3.com](mailto:nick@jasinski3.com)

Expanded Security Maintenance for Applications is not enabled.

7 updates can be applied immediately.
6 of these updates are standard security updates.
To see these additional updates run: apt list --upgradable

For a list of available commands please type "(class=green bold)(help)"

*** System restart required ***
Last login: filler_time from filler_ip
    `,
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
