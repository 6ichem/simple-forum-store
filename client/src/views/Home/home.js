import React from "react";
import Categories from "../../components/categories";
import Navbar from "../../components/navbar";

export default function home() {
  return (
    <div>
      <Navbar />
      <div className="my-5">
        <Categories />
      </div>
    </div>
  );
}
