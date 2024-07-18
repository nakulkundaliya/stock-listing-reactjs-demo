// reducers/index.js
import { combineReducers } from "redux";
import { alertReducer, stockReducer, symbolReducer } from "./stockReducer";

const rootReducer = combineReducers({
  stock: stockReducer,
  symbol: symbolReducer,
  setAlert: alertReducer,
});

export default rootReducer;
