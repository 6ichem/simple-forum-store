import React from "react";
import { useHistory } from "react-router";

export default function Thread({ title, author, threadId, threadData }) {
  const history = useHistory();
  console.log(threadData);
  return (
    <a
      onClick={() =>
        history.push({
          pathname: `/thread`,
          search: `?threadId=${threadId}`,
          state: { id: threadId },
        })
      }
      className="w-full"
    >
      <div className="contain">
        <div>
          <span className="font-bold text-white text-xl">{title}</span>
          <p className="text-base text-gray-400 mt-1">{author}</p>
        </div>
      </div>
    </a>
  );
}
