import React from "react";
import { useHistory } from "react-router";

export default function Category({ title, desc, topicsNumber, categoryId }) {
  const history = useHistory();
  return (
    <a
      onClick={() =>
        history.push({
          pathname: `/threads`,
          search: `?categoryId=${categoryId}`,
          state: { id: categoryId, name: title },
        })
      }
      className="w-full"
    >
      <div className="contain">
        <div>
          <span className="font-bold text-white text-xl">{title}</span>
          <p className="text-base text-gray-400 mt-1">{desc}</p>
        </div>
      </div>
    </a>
  );
}
