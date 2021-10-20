import React, { useState, useEffect, useContext } from "react";
import httpClient from "../services/httpClient";
import Category from "./category";
import { Context } from "../state/context";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export default function Categories() {
  const { setModal, openModal } = useContext(Context);

  const [categories, setCategories] = useState();

  const getCategories = async () => {
    try {
      const { data } = await httpClient().get("/api/categories/");
      setCategories(data);
    } catch (e) {
      console.log("GetCategories", e);
    }
  };

  useEffect(() => {
    getCategories();
  }, [openModal]);

  return (
    <div
      className="py-10 px-3 mx-3 md:mx-52 md:px-12 shadow-2xl"
      style={{ backgroundColor: "#30343a73" }}
    >
      <div className="flex flex-col md:flex-row justify-between align-middle items-center">
        <h1 className="font-semibold text-2xl mb-3 md:mb-0">Categories</h1>

        <button
          style={{ borderColor: "#FFD369", borderWidth: "0.1px" }}
          className="text-sm py-2 px-5 rounded outline-none focus:outline-none transition-all duration-500 ease-in-out hover:opacity-70"
          onClick={() => setModal(true)}
        >
          Create a new category
        </button>
      </div>
      <hr className="mt-5 mb-3 border-gray-500 rounded-full" />
      {categories ? (
        categories.map((i, index) => (
          <Category
            key={index}
            title={i.name}
            desc={i.description}
            categoryId={i._id}
          />
        ))
      ) : (
        <SkeletonTheme color="#181c22" highlightColor="rgba(48, 52, 58, 0.45)">
          <p>
            <Skeleton height={80} count={5} />
          </p>
        </SkeletonTheme>
      )}
    </div>
  );
}
