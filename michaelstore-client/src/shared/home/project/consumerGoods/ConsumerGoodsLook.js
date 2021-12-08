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

const ConsumerGoodsLook = (props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm({
    number: "",
    exp_month: "",
    exp_year: "",
    cvc: "",
  });

  const goodId = useParams().goodId;

  const [deleteMod, setDeleteMod] = useState(false);

  const navigate = useNavigate();

  const auth = useContext(AuthContext);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [aGood, setAGood] = useState();

  const [aPrice, setAPrice] = useState();

  const thankYou = () => {
    navigate("/home");
  };

  useEffect(() => {
    const fetchAnItem = async () => {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/admin/getAConsumerItem/${goodId}`
      );
      setAGood(responseData.findItem);

      const thePrice = responseData.findItem.price.toString();

      const thePriceSplice =
        thePrice.slice(0, thePrice.length - 2) +
        "." +
        thePrice.slice(thePrice.length - 2);

      setAPrice(thePriceSplice);
    };

    fetchAnItem();
  }, [goodId, sendRequest, auth.token]);

  const [backGround, setBackGround] = useState(false);

  const [purchased, setPurchased] = useState(false);

  const purchaseToggle = () => {
    if (backGround === false) {
      setBackGround(true);
    } else {
      setBackGround(false);
    }
  };

  const submitPurchase = async (data) => {
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/customer/purchaseGood`,
        "POST",
        JSON.stringify({
          itemId: goodId,
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          street: data.street,
          city: data.city,
          state: data.state,
          zipCode: data.zipCode,

          number: data.number,
          exp_month: data.exp_month,
          exp_year: data.exp_year,
          cvc: data.cvc,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      setPurchased(true);
    } catch (err) {}

    setBackGround(false);
  };

  const deleteAnItem = async () => {
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/admin/deleteConsumerItem/${goodId}`,
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

  const submitAuthPurchase = async () => {
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/customer/buyItemOnAccount`,
        "POST",
        JSON.stringify({
          itemId: goodId,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.customerToken,
        }
      );

      window.location.reload();
      navigate("/consumerGoods");
    } catch (err) {}
  };

  //   const thePrice = props.price.toString();

  //   const thePriceSplice =
  //     thePrice.slice(0, thePrice.length - 2) +
  //     "." +
  //     thePrice.slice(thePrice.length - 2);

  return (
    <div className="aConsumerItem">
      <ErrorModal error={error} onClear={clearError} />

      {backGround && (
        <div>
          <div
            onClick={purchaseToggle}
            className="purchaseModal-background"
          ></div>
          <div className="purchaseModal animationTop">
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && <LoadingSpinner asOverlay />}
            <h2 className="purchaseModal-title">
              We need some details from you to pay for this item! Login to for
              free messaging, update's on package delivery, and to save your
              card!
            </h2>
            <form
              onSubmit={handleSubmit(submitPurchase)}
              className="purchaseModal-form"
            >
              <label>email:</label>
              <br />
              <input {...register("email")} />
              <br />

              <label>first name:</label>
              <br />
              <input {...register("firstName")} />
              <br />
              <label>last name:</label>
              <br />
              <input {...register("lastName")} />
              <br />
              <label>street:</label>
              <br />
              <input {...register("street")} />
              <br />
              <label>city:</label>
              <br />
              <input {...register("city")} />
              <br />
              <label> state:</label>
              <br />
              <input {...register("state")} />
              <br />
              <label>zip code:</label>
              <br />
              <input {...register("zipCode")} />
              <br />
              <label>card number</label>
              <br />
              <input
                placeholder="xxxx-xxxx-xxxx-xxxx"
                maxLength="16"
                {...register("number")}
              />
              <br />
              <label>exp month</label>
              <br />
              <input
                maxLength="2"
                placeholder="xx"
                {...register("exp_month")}
              />
              <br />
              <label>exp year</label>
              <br />
              <input
                maxLength="4"
                placeholder="xxxx"
                {...register("exp_year")}
              />
              <br />
              <label>cvc</label>
              <br />
              <input placeholder="xxx" maxLength="3" {...register("cvc")} />
              <br />
              <button>purchase</button>
            </form>
            <div onClick={purchaseToggle}>nvm</div>
          </div>
        </div>
      )}

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
              {(!auth.token || !auth.customerToken) &&
                !auth.token &&
                !auth.customerToken && (
                  <div className="aConsumerItem-itemContainer-labels-button-wrapper">
                    <div
                      className="aConsumerItem-itemContainer-labels-button"
                      onClick={purchaseToggle}
                    >
                      <div className="marginTop">
                        <IoCardOutline />
                      </div>
                    </div>
                  </div>
                )}
              {auth.customerToken && (
                <div className="aConsumerItem-itemContainer-labels-button-wrapper">
                  <div
                    className="aConsumerItem-itemContainer-labels-button"
                    onClick={submitAuthPurchase}
                  >
                    <div className="marginTop">
                      <IoCardOutline />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {purchased && (
            <div className="purchaseModal-purchasedModal">
              {" "}
              <div className="purchaseModal-purchasedModal-text">
                <h2>
                  Thanks for shopping with us. Check your email for a
                  confirmation of your order.
                </h2>{" "}
                <img
                  className="purchaseModal-purchasedModal-img"
                  src={celebration}
                  alt="purchased"
                />
                <button
                  className="purchaseModal-purchasedModal-button"
                  onClick={thankYou}
                >
                  {" "}
                  okay{" "}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ConsumerGoodsLook;
