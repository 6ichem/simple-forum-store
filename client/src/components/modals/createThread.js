import React, { useContext, useState } from "react";
import Modal from "react-modal";
import { Context } from "../../state/context";
import Styles from "./Modals.module.scss";
import httpClient from "../../services/httpClient";
import Errorbar from "../errorbar";

Modal.setAppElement("#root");

export default function CreateThread({ categoryId }) {
  const { openThreadsModal, setThreadsModal, user } = useContext(Context);

  function closeModal() {
    setThreadsModal(false);
  }

  const [threadName, setThreadName] = useState();
  const [threadContent, setThreadContent] = useState();

  const [errs, seterr] = useState([]);

  const onSubmit = async (e) => {
    e.preventDefault();
    let _errs = [];
    !threadName && _errs.push("A name is required");

    if (_errs.length) {
      seterr(_errs);
    } else {
      try {
        const res = await httpClient().post("/api/threads/create", {
          name: threadName,
          author: user.username,
          content: threadContent,
          categoryId: categoryId,
        });

        res && closeModal();
      } catch (e) {
        seterr([e.response.data.message]);
      }
    }
  };

  return (
    <Modal
      isOpen={openThreadsModal}
      onRequestClose={closeModal}
      className={`${Styles.content} ${Styles.Modal} h-auto w-auto`}
      closeTimeoutMS={500}
      style={{
        overlay: {
          backgroundColor: "rgba(35, 34, 44, 0.95)",
          zIndex: "999999",
        },
      }}
      contentLabel="Example Modal"
    >
      <form onSubmit={onSubmit}>
        {errs.length > 0 &&
          errs.map((i, index) => (
            <div key={index}>
              <Errorbar message={i} />
            </div>
          ))}
        <span className="text-base">Enter thread name:</span>
        <input
          className="w-full my-5 p-3"
          onChange={(e) => setThreadName(e.target.value)}
          required
        />
        <textarea
          className="w-full mb-5 p-3"
          onChange={(e) => setThreadContent(e.target.value)}
          cols="30"
          rows="10"
          required
        ></textarea>
        <button
          type="submit"
          style={{ borderColor: "#FFD369", borderWidth: "0.1px" }}
          className="w-full text-white mt-1 text-sm py-2 px-5 rounded outline-none focus:outline-none transition-all duration-500 ease-in-out hover:opacity-70"
          onClick={onSubmit}
        >
          Create a new thread
        </button>
      </form>
    </Modal>
  );
}
