import React from "react";

export default function Errorbar({ message }) {
  return (
    <div className="flex flex-col text-left bg-red-500 p-4 rounded-md mt-3 mb-1">
      <p className="text-red-100 text-sm font-semibold">{message}</p>
    </div>
  );
}
