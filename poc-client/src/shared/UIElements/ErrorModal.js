import React from "react";

import Modal from "./Modal";

const ErrorModal = (props) => {
  return (
    <Modal
      onCancel={props.onClear}
      header="Problem!"
      show={!!props.error}
      footer={
        <button className="modalButton" onClick={props.onClear}>
          {" "}
          okay{" "}
        </button>
      }
    >
      <p>{props.error}</p>
    </Modal>
  );
};

export default ErrorModal;
