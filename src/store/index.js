import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import output from "./output";

const reducer = combineReducers({
  output,
});

const store = configureStore({
  reducer,
});

export default store;

