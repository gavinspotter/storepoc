import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useHttpClient } from "../../../hooks/http-hook";

import { AuthContext } from "../../../context/auth-context";
import { useForm } from "react-hook-form";

import { useParams } from "react-router-dom";
import ErrorModal from "../../../UIElements/ErrorModal";

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

  const navigate = useNavigate();

  const auth = useContext(AuthContext);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [aGood, setAGood] = useState();

  const [aPrice, setAPrice] = useState();

  useEffect(() => {
    const fetchAnItem = async () => {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/admin/getAConsumerItem/${goodId}`,
        "GET",
        null,
        {
          Authorization: "Bearer " + auth.token,
        }
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

      navigate("/consumerGoods");
    } catch (err) {}

    setBackGround(false);
  };

  return (
    <div className="aConsumerItem">
      <ErrorModal error={error} onClear={clearError} />

      {backGround && (
        <div>
          <div className="purchaseModal-background"></div>
          <div className="purchaseModal animationTop">
            <ErrorModal error={error} onClear={clearError} />
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
          <div className="aConsumerItem-itemContainer-img-container">
            <img
              className="aConsumerItem-itemContainer-img"
              src={`https://s3.us-east-1.amazonaws.com/michaelrossbucket/${aGood.bucketPhotoId}`}
              alt={`${aGood.description}`}
            />
          </div>
          <div className="aConsumerItem-itemContainer-labels">
            <div>{aGood.name}</div>
            <div className="aConsumerItem-itemContainer-labels-description">
              {aGood.description.slice(0, 250)}
            </div>
            {aPrice && <div>{aPrice}</div>}
          </div>
          <div onClick={purchaseToggle}>buy</div>
        </div>
      )}
    </div>
  );
};

export default ConsumerGoodsLook;
