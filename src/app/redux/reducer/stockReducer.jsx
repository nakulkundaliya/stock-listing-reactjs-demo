// reducers/stockReducer.js
import { createSlice } from "@reduxjs/toolkit";

const stockSlice = createSlice({
  name: "stock",
  initialState: {
    data: [],
    id: 1,
    loading: false,
    error: null,
  },
  reducers: {
    fetchStockDataRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchStockDataSuccess: (state, action) => {
      state.loading = false;
      state.data = [action.payload?.data];
    },
    fetchStockDataFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const fetchSymbolDataSlice = createSlice({
  name: "symbol",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchSymbolDataRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSymbolDataSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchSymbolDataFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const setAlertDataSlice = createSlice({
  name: "alert",
  initialState: {
    data: '',
    loading: false,
    error: null,
  },
  reducers: {
    setAlertDataRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    setAlertDataSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    setAlertDataFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchStockDataRequest,
  fetchStockDataSuccess,
  fetchStockDataFailure,
} = stockSlice.actions;

export const {
  fetchSymbolDataRequest,
  fetchSymbolDataSuccess,
  fetchSymbolDataFailure,
} = fetchSymbolDataSlice.actions;

export const { setAlertDataRequest, setAlertDataSuccess, setAlertDataFailure } =
  setAlertDataSlice.actions;

export const stockReducer = stockSlice.reducer;
export const symbolReducer = fetchSymbolDataSlice.reducer;
export const alertReducer = setAlertDataSlice.reducer;
