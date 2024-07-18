"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSymbolDataRequest } from "../redux/reducer/stockReducer";
import Loader from "./Loader";

const StockList = ({ setInitialItem }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data: symbolData, loading } = useSelector(
    (state: any) => state?.symbol
  );
  const dispatch = useDispatch();

  const itemsPerPage = 10;
  const maxPageNumbersToShow = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = symbolData?.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(symbolData?.length / itemsPerPage);
  const startPage = Math.max(
    1,
    currentPage - Math.floor(maxPageNumbersToShow / 2)
  );
  const endPage = Math.min(totalPages, startPage + maxPageNumbersToShow - 1);

  useEffect(() => {
    dispatch(fetchSymbolDataRequest());
  }, [dispatch]);

  const handleOpenDetails = (symbol: any) => {
    setInitialItem(symbol);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPageSet = () => {
    if (endPage < totalPages) {
      setCurrentPage(endPage + 1);
    }
  };

  const handlePreviousPageSet = () => {
    if (startPage > 1) {
      setCurrentPage(startPage - 1);
    }
  };

  return (
    <div>
      <div className="flex min-h-screen items-center justify-center">
        <div className="overflow-x-auto min-h-screen w-96">
          <table className="bg-white shadow-md rounded-xl">
            <thead>
              <tr className="bg-blue-gray-100 text-gray-700">
                <th className="py-3 px-4 text-left">Stock Name</th>
              </tr>
            </thead>

            <tbody className="text-blue-gray-900 text-gray-700">
              {!loading ? (
                currentItems?.map((items: any, index: number) => (
                  <tr
                    key={index}
                    className="border-b border-blue-gray-200"
                    onClick={() => handleOpenDetails(items?.displaySymbol)}
                  >
                    <td className="py-3 px-4">
                      <strong>{items?.description}</strong>{" "}
                      <i>({items?.displaySymbol})</i>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5}>
                    <Loader />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {!loading && (
            <div className="flex justify-center pt-4 pb-4 pl-4 pr-4 min-w-full bg-white shadow-md">
              <div>
                {startPage > 1 && (
                  <button
                    onClick={handlePreviousPageSet}
                    className="mx-1 px-3 py-1 border rounded bg-white text-blue-500"
                  >
                    &laquo;
                  </button>
                )}
                {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => handlePageChange(startPage + index)}
                    className={`mx-1 px-3 py-1 border rounded ${
                      currentPage === startPage + index
                        ? "bg-blue-500 text-white"
                        : "bg-white text-blue-500"
                    }`}
                  >
                    {startPage + index}
                  </button>
                ))}
                {endPage < totalPages && (
                  <button
                    onClick={handleNextPageSet}
                    className="mx-1 px-3 py-1 border rounded bg-white text-blue-500"
                  >
                    &raquo;
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StockList;
