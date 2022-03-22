import {
  createStore,
  combineReducers,
  applyMiddleware,
} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { storeReducer } from "../reducers/reducer";

const ReduxStore = () => {
  const store = createStore(
    combineReducers({
      cartReducer: storeReducer,
    }),
    applyMiddleware(thunk)
  );
  return store;
};

export default ReduxStore;
