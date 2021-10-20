import React, { createContext, useState, useEffect } from "react";
import httpClient from "../services/httpClient";

export const Context = createContext();

export function Provider(props) {
  const [user, setUser] = useState();
  const [init, setInit] = useState(false);

  const [openModal, setModal] = useState(false);
  const [openThreadsModal, setThreadsModal] = useState(false);
  const [openPurchaseModal, setPurchaseModal] = useState(false);

  const token = localStorage.getItem("token");

  const initialize = async () => {
    const { data } = await httpClient().get(`/api/user/initialize`);
    setUser(data.user);
    setInit(true);
  };

  useEffect(() => {
    initialize();
  }, [token]);

  return (
    <Context.Provider
      value={{
        user,
        init,
        setUser: setUser,
        openModal,
        setModal: setModal,
        openThreadsModal,
        setThreadsModal: setThreadsModal,
        openPurchaseModal,
        setPurchaseModal: setPurchaseModal,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}
