import React, { useEffect, useState, useContext } from "react";

import { useHttpClient } from "../../../hooks/http-hook";

import { AuthContext } from "../../../context/auth-context";

import { useNavigate } from "react-router-dom";
import ErrorModal from "../../../UIElements/ErrorModal";

import "../../../../css/style.css";

const BulkItem = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const navigate = useNavigate();

  const auth = useContext(AuthContext);

  const [dString, setDString] = useState(false);

  useEffect(() => {
    if (props.description.length >= 45) {
      setDString(true);
    }
  }, [props.description]);

  const deleteAnItem = async () => {
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/admin/deleteBulk/${props._id}`,
        "DELETE",
        null,
        {
          Authorization: "Bearer " + auth.token,
        }
      );

      window.location.reload();
      navigate("/consumerGoods");
    } catch (err) {}
  };

  const [deleteMod, setDeleteMod] = useState(false);

  const deleteModalTrig = async () => {
    setDeleteMod(true);
  };

  const deleteModalFalse = async () => {
    setDeleteMod(false);

    // globalC({deleteModal:"trigger"})
    // console.log(globalC)
  };

  return (
    <div className="consumerGoods--card">
      <ErrorModal error={error} onClear={clearError} />

      <img
        className="consumerGoods--card-img"
        src={`https://s3.us-east-1.amazonaws.com/michaelrossbucket/${props.bucketPhotoId}`}
        alt={props.description}
      />

      <div className="consumerGoods--card-text">
        <p>{props.name}</p>
        {!dString && props.description.substring(0, 45)}
        {dString && <p>{props.description.substring(0, 45)} ...</p>}
        <p>${props.price}</p>
      </div>

      <div>
        {auth.token && (
          <div
            className="consumerGoods--card-adminText-button"
            onClick={deleteModalTrig}
          >
            delete
          </div>
        )}
        {deleteMod && (
          <div>
            <div>are you sure you would like to delete this?</div>

            <div onClick={deleteAnItem}>yes</div>
            <div onClick={deleteModalFalse}>no</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BulkItem;
