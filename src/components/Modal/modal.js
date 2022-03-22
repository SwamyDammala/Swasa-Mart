import React from "react";
import Modal from "react-modal";
import Loader from "../Loader/Loader";
import "./modal.css";

const PlaceOrderModal = (props) => {
  return (
    <Modal
      isOpen={!!props.checkOutModal}
      onRequestClose={props.handleCancel}
      contentLabel="Modal"
      closeTimeoutMS={200}
      ariaHideApp={false}
      className="modal"
    >
      <header>{props.headerContent()}</header>
      <body className="bodyContent">{props.bodyContent()}</body>
      {props.isLoading && <Loader />}
      <footer>
        <button className="button cancel_btn" onClick={props.handleCancel}>
          Cancel
        </button>
        <button className="button" onClick={props.handleConfirm}>
          {props.confirmBtn}
        </button>
      </footer>
    </Modal>
  );
};

export default PlaceOrderModal;
