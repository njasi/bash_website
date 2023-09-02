import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import output from "./output";
import command from "./command";

const reducer = combineReducers({
  output,
  command,
});

const store = configureStore({
  reducer,
});

export default store;
