// sagas/stockSaga.js
import { call, put, takeEvery } from "redux-saga/effects";
import {
  fetchStockDataRequest,
  fetchStockDataSuccess,
  fetchStockDataFailure,
  fetchSymbolDataFailure,
  fetchSymbolDataSuccess,
  fetchSymbolDataRequest,
  setAlertDataRequest,
  setAlertDataFailure,
  setAlertDataSuccess,
} from "../reducer/stockReducer";
import axios from "axios";
export const token = localStorage.getItem("userToken");
export const API_KEY = "cqaamt9r01qkfes2ste0cqaamt9r01qkfes2steg";

const fetchStockDataApi = async (symbol) => {
  const results = await axios.get(
    `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`
  );
  return results;
};

const fetchSymbolDataApi = async () => {
  const results = await axios.get(
    `https://finnhub.io/api/v1/stock/symbol?exchange=US&mic=XNYS&token=${API_KEY}`
  );
  return results;
};

const setAlertApi = async (action) => {
  console.log("actionaction", action);
  const results = await axios.post(
    "http://localhost:5000/api/set-threshold",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      index: action.symbol,
      threshold: action.threshold,
      email: action.email,
      direction: action.direction,
    },
  );
  return results;
};

function* fetchStockData(action) {
  try {
    const response = yield call(fetchStockDataApi, action.payload);
    yield put(fetchStockDataSuccess(response));
  } catch (error) {
    yield put(fetchStockDataFailure(error.message));
  }
}

function* fetchSymbolDataSaga(action) {
  try {
    const response = yield call(fetchSymbolDataApi, action.payload);
    yield put(fetchSymbolDataSuccess(response.data));
  } catch (error) {
    yield put(fetchSymbolDataFailure(error.message));
  }
}

function* setAlertSaga(action) {
  try {
    const response = yield call(setAlertApi, action.payload);
    yield put(setAlertDataSuccess(response.data));
  } catch (error) {
    yield put(setAlertDataFailure(error.message));
  }
}

export default function* stockSaga() {
  yield takeEvery(fetchStockDataRequest.type, fetchStockData);
  yield takeEvery(fetchSymbolDataRequest.type, fetchSymbolDataSaga);
  yield takeEvery(setAlertDataRequest.type, setAlertSaga);
}
