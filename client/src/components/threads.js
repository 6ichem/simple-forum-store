import React, { useState, useEffect, useContext } from "react";
import httpClient from "../services/httpClient";
import Thread from "./thread";
import { Context } from "../state/context";
import CreateThread from "./modals/createThread";
import { useLocation, useHistory } from "react-router";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import Navbar from "./navbar";

export default function Threads() {
  const { setThreadsModal, openThreadsModal } = useContext(Context);

  const [threads, setThreads] = useState();
  const location = useLocation();
  const history = useHistory();
  const { id, name } = location.state;

  const getThreads = async () => {
    try {
      const { data } = await httpClient().get(`/api/threads?categoryId=${id}`);
      setThreads(data);
    } catch (e) {
      console.log("GetThreads", e);
    }
  };

  useEffect(() => {
    getThreads();
  }, [openThreadsModal]);

  return (
    <div>
      <Navbar />

      <div
        className="py-10 px-3 mx-3 md:mx-52 md:px-12 rounded-lg my-5"
        style={{ backgroundColor: "#30343a73" }}
      >
        <div className="flex flex-col md:flex-row justify-between align-middle items-center">
          <button onClick={() => history.goBack()}>
            <AiOutlineArrowLeft className="h-8 w-8 opacity-50 hover:opacity-100 transition-all duration-500 ease-in-out mx-5" />
          </button>
          <h1 className="font-semibold text-2xl mb-3 md:mb-0">{name}</h1>
          <button
            style={{ borderColor: "#FFD369", borderWidth: "0.1px" }}
            className="text-white text-sm py-2 px-5 rounded outline-none focus:outline-none transition-all duration-500 ease-in-out hover:opacity-70"
            onClick={() => setThreadsModal(true)}
          >
            Create a new thread
          </button>
        </div>
        <hr className="mt-5 mb-3 border-gray-500 rounded-full" />
        {threads ? (
          threads.map((i, index) => (
            <Thread
              key={index}
              title={i.name}
              desc={i.description}
              categoryId={i._id}
              author={i.author}
              content={i.content}
              threadData={i}
              threadId={i._id}
            />
          ))
        ) : (
          <SkeletonTheme
            color="#181c22"
            highlightColor="rgba(48, 52, 58, 0.45)"
          >
            <p>
              <Skeleton height={80} count={5} />
            </p>
          </SkeletonTheme>
        )}
        <CreateThread categoryId={id} />
      </div>
    </div>
  );
}
