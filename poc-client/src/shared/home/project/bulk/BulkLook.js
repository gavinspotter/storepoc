import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useHttpClient } from "../../../hooks/http-hook";

import { AuthContext } from "../../../context/auth-context";
import { set, useForm } from "react-hook-form";
import { IoBackspaceOutline, IoCardOutline } from "react-icons/io5";

import { useParams } from "react-router-dom";
import ErrorModal from "../../../UIElements/ErrorModal";
import LoadingSpinner from "../../../UIElements/LoadingSpinner";

import celebration from "../../../../img/celebration.gif";

const BulkLook = (props) => {
  const goodId = useParams().biId;

  const [deleteMod, setDeleteMod] = useState(false);

  const navigate = useNavigate();

  const auth = useContext(AuthContext);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [aGood, setAGood] = useState();

  const [aPrice, setAPrice] = useState();

  useEffect(() => {
    const fetchAnItem = async () => {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/admin/getABulkItem/${goodId}`
      );

      if (responseData.findItem != null) {
        console.log(responseData);
        setAGood(responseData.findItem);
        const thePrice = responseData.findItem.price.toString();

        const thePriceSplice =
          thePrice.slice(0, thePrice.length - 2) +
          "." +
          thePrice.slice(thePrice.length - 2);

        setAPrice(thePriceSplice);
      }
    };

    fetchAnItem();
  }, [goodId, sendRequest, auth.token]);

  const [backGround, setBackGround] = useState(false);

  const [purchased, setPurchased] = useState(false);

  const deleteAnItem = async () => {
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/admin/deleteBulk/${goodId}`,
        "DELETE",
        null,
        {
          Authorization: "Bearer " + auth.token,
        }
      );

      navigate("/");
    } catch (err) {}
  };

  const deleteModalTrig = async () => {
    setDeleteMod(true);
  };

  const deleteModalFalse = async () => {
    setDeleteMod(false);

    // globalC({deleteModal:"trigger"})
    // console.log(globalC)
  };

  return (
    <div className="aConsumerItem">
      <ErrorModal error={error} onClear={clearError} />

      {aGood && aPrice && (
        <div className="aConsumerItem-itemContainer">
          <div className="aConsumerItem-itemContainer-infoContainer">
            <div className="aConsumerItem-itemContainer-img-container">
              <img
                className="aConsumerItem-itemContainer-img"
                src={`https://s3.us-east-1.amazonaws.com/michaelrossbucket/${aGood.bucketPhotoId}`}
                alt={`${aGood.description}`}
              />
            </div>
            <div className="aConsumerItem-itemContainer-labels">
              <div className="aConsumerItem-itemContainer-labels-info">
                <div className="aConsumerItem-itemContainer-labels-description">
                  {aGood.name}
                </div>
                <div className="aConsumerItem-itemContainer-labels-description">
                  {aGood.description.slice(0, 250)}
                </div>
                {aPrice && (
                  <div className="aConsumerItem-itemContainer-labels-description">
                    {aPrice}
                  </div>
                )}
              </div>
              {auth.token && (
                <div className="aConsumerItem-itemContainer-labels-button-wrapper">
                  <div
                    className="aConsumerItem-itemContainer-labels-button"
                    onClick={deleteModalTrig}
                  >
                    <div className="marginTop">
                      <IoBackspaceOutline />
                    </div>
                  </div>
                  {deleteMod && (
                    <div className="purchaseModal-purchasedModal">
                      <div className="purchaseModal-purchasedModal-text">
                        <h2> are you sure you would like to delete this? </h2>
                      </div>
                      <div
                        className="aConsumerItem-itemContainer-labels-deleteButtons"
                        onClick={deleteAnItem}
                      >
                        yes
                      </div>

                      <div
                        className="aConsumerItem-itemContainer-labels-deleteButtons"
                        onClick={deleteModalFalse}
                      >
                        no
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BulkLook;
