import React, { useContext, useState } from "react";
import Modal from "react-modal";
import { Context } from "../../state/context";
import Styles from "./Modals.module.scss";
import httpClient from "../../services/httpClient";
import Errorbar from "../errorbar";
import StripeCheckout from "react-stripe-checkout";

Modal.setAppElement("#root");

export default function PurchaseItem({ categoryId }) {
  const { setPurchaseModal, openPurchaseModal, user } = useContext(Context);

  function closeModal() {
    setPurchaseModal(false);
  }

  const [product, setProduct] = useState({
    name: "Rust",
    price: 49.99,
    productBy: "Sipper",
  });

  const onSubmit = async (token, e) => {
    e.preventDefault();
    try {
      const res = await httpClient().post("/api/pay", {
        token,
        product,
      });

      console.log(res);
    } catch (e) {
      console.log("Pay error", e);
    }
  };

  return (
    <Modal
      isOpen={openPurchaseModal}
      onRequestClose={closeModal}
      className={`${Styles.content} ${Styles.Modal} h-auto w-1/3`}
      closeTimeoutMS={500}
      style={{
        overlay: {
          backgroundColor: "rgba(35, 34, 44, 0.95)",
          zIndex: "999999",
        },
      }}
      contentLabel="Example Modal"
    >
      <div className="flex flex-col border-2 border-green-700 p-4 shadow-lg mb-2 text-red-400 text-left">
        <span>* Purchase is non refundable</span>
        <span>
          * Your subscription can be cancelled anytime by the staff team
        </span>
        <span>* Subscription is not cancellable</span>
      </div>
      <span className="text-base">Choose a subscription plan:</span>
      <label class="flex radio p-2 cursor-pointer">
        <input
          class="my-auto transform scale-125"
          type="radio"
          name="sfg"
          onChange={() => setProduct({ ...product, price: 49.99 })}
        />
        <div class="px-2">49,99$/month</div>
      </label>
      <label class="flex radio p-2 cursor-pointer">
        <input
          class="my-auto transform scale-125"
          type="radio"
          name="sfg"
          onChange={() => setProduct({ ...product, price: 89.99 })}
        />
        <div class="px-2">89,99$/3 months</div>
      </label>
      <label class="flex radio p-2 cursor-pointer">
        <input
          class="my-auto transform scale-125"
          type="radio"
          name="sfg"
          onChange={() => setProduct({ ...product, price: 199.99 })}
        />
        <div class="px-2">199,99$/1 year</div>
      </label>
      <StripeCheckout
        stripeKey="pk_test_51JmZuRBgoDtJp3VwjC4boBuNPndzdMd3LzIu8owtUeezIyTwp0gFebGNCpTZroexeMnd3s23hLUP443zJpU30bPj00hapKSAfj"
        token={onSubmit}
        name="Rust subscription"
        amount={product.price * 100}
      >
        <button
          type="submit"
          style={{ borderColor: "#FFD369", borderWidth: "0.1px" }}
          className="w-full mt-2 h-full text-white text-sm py-2 px-5 rounded outline-none focus:outline-none transition-all duration-500 ease-in-out hover:opacity-70"
        >
          Purchase
        </button>
      </StripeCheckout>
    </Modal>
  );
}
