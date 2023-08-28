import { configureStore } from "@reduxjs/toolkit";
import { appReducer } from "./slices/app";

// Never remove this for type typescript thunk
import * as reduxThunk from "redux-thunk/extend-redux";

const reducer = {
  app: appReducer,
};

const store = configureStore({
  reducer: reducer,
  devTools: true,
});

export default store;
