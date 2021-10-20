import React, { useContext, useState, useEffect } from "react";
import Modal from "react-modal";
import { Context } from "../../state/context";
import Styles from "./Modals.module.scss";
import httpClient from "../../services/httpClient";
import Errorbar from "../errorbar";

Modal.setAppElement("#root");

export default function App() {
  const { openModal, setModal } = useContext(Context);

  function closeModal() {
    setModal(false);
  }

  const [categoryName, setCategoryName] = useState();
  const [categoryDescription, setCategoryDescription] = useState();

  const [errs, seterr] = useState([]);

  const onSubmit = async (e) => {
    e.preventDefault();
    let _errs = [];
    !categoryName && _errs.push("A name is required");

    if (_errs.length) {
      seterr(_errs);
    } else {
      try {
        const res = await httpClient().post("/api/categories/create", {
          name: categoryName,
          description: categoryDescription,
        });

        res && closeModal();
      } catch (e) {
        seterr([e.response.data.message]);
      }
    }
  };

  return (
    <Modal
      isOpen={openModal}
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
          ))}{" "}
        <span className="text-base">Enter category name:</span>
        <input
          className="w-full my-5 p-3"
          onChange={(e) => setCategoryName(e.target.value)}
          required
        />
        <textarea
          className="w-full mb-5 p-3"
          onChange={(e) => setCategoryDescription(e.target.value)}
          cols="30"
          rows="10"
          required
        ></textarea>
        <button
          type="submit"
          style={{ borderColor: "#FFD369", borderWidth: "0.1px" }}
          className="w-full text-white mt-1 text-sm py-2 px-5 rounded outline-none focus:outline-none transition-all duration-500 ease-in-out hover:opacity-70"
          onClick={() => setModal(true)}
        >
          Create a new category
        </button>
      </form>
    </Modal>
  );
}
