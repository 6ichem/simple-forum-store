import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import Navbar from "../../components/navbar";
import httpClient from "../../services/httpClient";
import TimeAgo from "timeago-react"; // var TimeAgo = require('timeago-react');
import { AiOutlineArrowLeft } from "react-icons/ai";

export default function Thread({ categoryId }) {
  const history = useHistory();
  const location = history.location;
  const { id } = location.state;
  const [threadInfo, setThreadInfo] = useState();
  const getThreadInfo = async () => {
    try {
      const { data } = await httpClient().get(`/api/threads/${id}`);
      setThreadInfo(data);
    } catch (e) {
      console.log("getTread", e);
    }
  };

  const { author, createdAt, updatedAt, name, content } = threadInfo ?? {};

  useEffect(() => {
    getThreadInfo();
  }, []);

  return (
    <div>
      <Navbar />
      <div
        className="py-10 px-3 mx-3 md:mx-52 md:px-12 shadow-2xl min-h-96"
        style={{ backgroundColor: "#30343a73" }}
      >
        <div className="flex align-middle items-center">
          <button onClick={() => history.goBack()}>
            <AiOutlineArrowLeft className="h-8 w-8 opacity-50 hover:opacity-100 transition-all duration-500 ease-in-out mr-5" />
          </button>
          <h1 className="font-semibold text-2xl mb-3 md:mb-0">{name}</h1>
        </div>
        <hr className="mt-5 mb-3 border-gray-500 rounded-full" />
        <div
          className="flex flex-col mb-2"
          style={{ backgroundColor: "#181c22" }}
        >
          <div className="flex justify-between px-5 py-2">
            <span className="my-3 text-xl">{author}</span>
            <span className="my-3 text-xl">
              <TimeAgo
                datetime={createdAt}
                live={false}
                opts={{ minInterval: 120 }}
              />
            </span>
          </div>
        </div>
        <span className="px-2 mt-2 text-gray-400">
          Last modified{" "}
          <TimeAgo
            datetime={updatedAt}
            live={false}
            opts={{ minInterval: 120 }}
          />
        </span>
        <div className="px-2 mt-2 flex flex-col">
          <span style={{ whiteSpace: "pre-line" }}>{content}</span>
        </div>
      </div>
    </div>
  );
}
