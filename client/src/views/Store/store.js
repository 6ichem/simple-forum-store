import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router";
import Navbar from "../../components/navbar";
import httpClient from "../../services/httpClient";
import { Context } from "../../state/context";
import Purchase from "../../components/modals/purchaseItem";

export default function Store() {
  const { setPurchaseModal } = useContext(Context);
  return (
    <div>
      <Navbar />
      <div
        className="py-10 px-3 mx-3 md:mx-52 md:px-12 shadow-2xl"
        style={{ backgroundColor: "#30343a73" }}
      >
        <div className="flex align-middle items-center">
          <h1 className="font-semibold text-2xl mb-3 md:mb-0">Store</h1>
        </div>
        <hr className="mt-5 mb-3 border-gray-500 rounded-full" />
        <div
          className="flex flex-row mb-2"
          style={{ backgroundColor: "#181c22" }}
        >
          <a
            onClick={() => setPurchaseModal(true)}
            className="flex flex-col w-full hover:opacity-50 transition-all duration-500 ease-in-out"
          >
            <div
              className="p-5 flex flex-col justify-center items-center align-middle text-center cursor-pointer my-1"
              style={{ backgroundColor: "#181c22" }}
            >
              <img src="games/rust.png" className="h-20 w-20 mb-2" alt="" />
              <span className="font-bold text-white text-base">Rust</span>
              <span className="font-bold text-yellow-400 text-base">
                Starting from 49,99$
              </span>
            </div>
          </a>
        </div>
      </div>
      <Purchase />
    </div>
  );
}
