"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LineChart from "@/app/components/LineChart";
import {
  fetchStockDataRequest,
  setAlertDataRequest,
} from "../redux/reducer/stockReducer";
import Loader from "../components/Loader";
import Snackbar from "../components/Snackbar";
import StockList from "../components/StockList";

interface StockData {
  c: number;
  h: number;
  l: number;
  t: number;
}

interface RootState {
  stock: {
    data: StockData[];
    priceLoading: boolean;
    priceError: string | null;
  };
}

const Page: React.FC = () => {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  // const symbol = searchParams.get("symbol");
  const {
    data: PriceData,
    priceLoading,
    priceError,
  } = useSelector((state: RootState) => state.stock);

  const {
    data: symbolData,
    loading,
    error,
  } = useSelector((state: any) => state.symbol);

  const setpriceLoading = useSelector(
    (state: any) => state.setAlert.loading
  );
  const setAlertSuccMess = useSelector(
    (state: any) => state.setAlert.data
  );
  const alertPriceError = useSelector(
    (state: any) => state.setAlert.error
  );

  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [initialItem, setInitialItem] = useState<any>("");
  

  const showSnackbar = (message: string) => {
    setSnackbarMessage(message);
  };

  const handleCloseSnackbar = () => {
    setSnackbarMessage("");
  };

  const [threshold, setThreshold] = useState("");
  const [direction, setDirection] = useState("above");
  const email = "jhonemike@mailinator.com";

  useEffect(() => {
    if (initialItem) {
      dispatch(fetchStockDataRequest(initialItem));
    }
  }, [initialItem]);

  useEffect(() => {
    if (setAlertSuccMess || alertPriceError) {
      showSnackbar(setAlertSuccMess || alertPriceError);
    }
  }, [setAlertSuccMess, alertPriceError]);

  const handleSetAlert = async (symbol: any, threshold: any) => {
    dispatch(setAlertDataRequest({ symbol, threshold, email, direction }));
  };

  const chartData = {
    labels: PriceData?.flatMap((data) => [
      `${new Date(data.t * 1000).toLocaleDateString()} (Low)`,
      `${new Date(data.t * 1000).toLocaleDateString()} (Current)`,
      `${new Date(data.t * 1000).toLocaleDateString()} (High)`,
    ]),
    datasets: [
      {
        label: "Stock Price",
        data: PriceData?.flatMap((data) => [data.l, data.c, data.h]),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        fill: false,
      },
    ],
  };

  return (
    <div className="mx-16 my-4">
      {priceLoading ? (
        <Loader />
      ) : priceError ? (
        <div>Error loading data: {priceError}</div>
      ) : (
        <div className="flex gap-20">
          <StockList setInitialItem={setInitialItem} />
          <div className="w-3/5">
            <h1 className="font-extrabold flex justify-center">
              Details for {initialItem}
            </h1>
            <LineChart chartData={chartData} />
          </div>
          <div className="pr-4 flex flex-col-reverse justify-end">
            <div className="pb-2 pt-5">
              <label>Enter Threshold:</label>
              <input
                value={threshold}
                type="number"
                placeholder="Set threshold"
                onChange={(e) => setThreshold(e.target.value)}
                className="text-black h-8 mt-1 pl-2 mb-5 w-full"
              />
              <br />
              <label className="flex flex-col w-200">
                Alert Direction:
                <select
                  value={direction}
                  onChange={(e) => setDirection(e.target.value)}
                  required
                  className="text-black h-8 mt-1 pl-2 mb-5"
                >
                  <option value="above">Above</option>
                  <option value="below">Below</option>
                </select>
              </label>
              <button
                onClick={() => handleSetAlert(initialItem, threshold)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-2 mb-2 rounded"
              >
                {!setpriceLoading ? (
                  "Set Threshold"
                ) : (
                  <div className="h-8">
                    <Loader />
                  </div>
                )}
              </button>
            </div>
            <table className="min-w-full bg-white shadow-md rounded-xl mr-2 mt-50">
              <thead>
                <tr className="bg-blue-gray-100 text-gray-700">
                  <th className="py-3 px-4 text-left">Low price</th>
                  <th className="py-3 px-4 text-left">Current Price</th>
                  <th className="py-3 px-4 text-left">High price</th>
                </tr>
              </thead>

              <tbody className="text-blue-gray-900 text-gray-700">
                {!priceLoading ? (
                  PriceData?.map((items, index) => (
                    <tr key={index} className="border-b border-blue-gray-200">
                      <td className="py-3 px-4">{items.l}</td>
                      <td className="py-3 px-4">{items.c}</td>
                      <td className="py-3 px-4">{items.h}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3}>
                      <Loader />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <Snackbar
            message={snackbarMessage}
            duration={5000}
            onClose={handleCloseSnackbar}
          />
        </div>
      )}
    </div>
  );
};

export default Page;
