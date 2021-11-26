import { set } from "mongoose";
import React, { useContext, useEffect, useState } from "react";

import { useForm } from "react-hook-form";

import { AuthContext } from "../../shared/context/auth-context";

import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/UIElements/LoadingSpinner";

const DetailsContainer = () => {
  const auth = useContext(AuthContext);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

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

  const [customerData, setCustomerData] = useState();

  const [stripeData, setStripeData] = useState();

  const [confTrigger, setConfTrigger] = useState();

  const [detailsConfirmation, setDetailsConfirmation] = useState(false);

  const [cardConfirmation, setCardConfirmation] = useState(false);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        number: "",
        exp_month: "",
        exp_year: "",
        cvc: "",
      });
    }
  }, [reset, isSubmitSuccessful]);

  useEffect(() => {
    const fetchData = async () => {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/customer/getCustomer`,
        "GET",
        null,
        {
          //"Content-Type": "application/json",
          Authorization: "Bearer " + auth.customerToken,
        }
      );
      setCustomerData(responseData.findUser);
      setStripeData(responseData.customer);
      console.log(responseData);

      if (
        responseData.findUser.deliveryDetails &&
        responseData.findUser.deliveryDetails.firstName &&
        responseData.findUser.deliveryDetails.lastName &&
        responseData.findUser.deliveryDetails.street &&
        responseData.findUser.deliveryDetails.city &&
        responseData.findUser.deliveryDetails.state &&
        responseData.findUser.deliveryDetails.country &&
        responseData.findUser.deliveryDetails.zipCode
      ) {
        setDetailsConfirmation(true);
      } else {
        setDetailsConfirmation(false);
      }

      if (responseData.customer.default_source) {
        setCardConfirmation(true);
      } else {
        setCardConfirmation(false);
      }
    };

    fetchData();
  }, [sendRequest, confTrigger, auth.customerToken]);

  const detailsSubmit = async (data) => {
    try {
      await sendRequest(
        `http://localhost:5000/api/customer/updateDetails`,
        "PATCH",
        JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          street: data.street,
          state: data.state,
          city: data.city,
          country: data.country,
          zipCode: data.zipCode,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.customerToken,
        }
      );
    } catch (err) {}
    setConfTrigger(Math.random() * 1000000);
  };

  const cardSubmit = async (data) => {
    try {
      await sendRequest(
        `http://localhost:5000/api/customer/updateCard`,
        "PATCH",
        JSON.stringify({
          number: data.number,
          exp_month: data.exp_month,
          exp_year: data.exp_year,
          cvc: data.cvc,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.customerToken,
        }
      );
    } catch (err) {}
    setConfTrigger(Math.random() * 1000000);
  };

  const [toggleCard, setToggleCard] = useState(false);

  const toggleCardFunc = () => {
    if (toggleCard === true) {
      setToggleCard(false);
    } else {
      setToggleCard(true);
    }
  };

  return (
    <div className="details">
      <ErrorModal error={error} onClear={clearError} />

      {isLoading && <LoadingSpinner asOverlay />}

      <div onClick={auth.customerLogout}> logout</div>

      <div className="details-container">
        <h3 className="details-title">
          Hey there, we need some details to perfect your order(s)!
        </h3>

        <div className="details-form">
          {!toggleCard && (
            <div className="details-toggle" onClick={toggleCardFunc}>
              {" "}
              <button className="details-toggle-button">edit card </button>{" "}
              {!detailsConfirmation && (
                <div>❎ we still need some details from you</div>
              )}
            </div>
          )}
          {toggleCard && (
            <div className="details-toggle" onClick={toggleCardFunc}>
              <button className="details-toggle-button-blue">
                edit details{" "}
              </button>
              {stripeData && !stripeData.default_source && (
                <div>❎ we still need this</div>
              )}
            </div>
          )}
          <div>
            <div className="details-delivInfo">
              {!toggleCard && customerData && (
                <form onSubmit={handleSubmit(detailsSubmit)}>
                  <h3>delivery details</h3>

                  {customerData.deliveryDetails && (
                    <div>
                      {customerData.deliveryDetails.firstName &&
                        customerData.deliveryDetails.lastName &&
                        customerData.deliveryDetails.street &&
                        customerData.deliveryDetails.city &&
                        customerData.deliveryDetails.state &&
                        customerData.deliveryDetails.country &&
                        customerData.deliveryDetails.zipCode &&
                        detailsConfirmation && (
                          <div>we have your information ✅</div>
                        )}
                    </div>
                  )}

                  {
                    <div>
                      <div>
                        <div>First Name:</div>

                        {(!customerData.deliveryDetails ||
                          !customerData.deliveryDetails.firstName) && (
                          <input {...register("firstName")} />
                        )}

                        {customerData.deliveryDetails &&
                          customerData.deliveryDetails.firstName && (
                            <input
                              defaultValue={
                                customerData.deliveryDetails.firstName
                              }
                              {...register("firstName")}
                            />
                          )}
                      </div>

                      <div>Last Name:</div>

                      {(!customerData.deliveryDetails ||
                        !customerData.deliveryDetails.lastName) && (
                        <input {...register("lastName")} />
                      )}

                      {customerData.deliveryDetails &&
                        customerData.deliveryDetails.lastName && (
                          <input
                            defaultValue={customerData.deliveryDetails.lastName}
                            {...register("lastName")}
                          />
                        )}

                      {/* <div>Last Name:</div>

                    <input
                      defaultValue={customerData.lastName}
                      {...register("lastName")}
                    /> */}

                      <div>Street:</div>
                      {customerData.deliveryDetails &&
                        customerData.deliveryDetails.street && (
                          <input
                            defaultValue={customerData.deliveryDetails.street}
                            {...register("street")}
                          />
                        )}

                      {(!customerData.deliveryDetails ||
                        !customerData.deliveryDetails.street) && (
                        <input {...register("street")} />
                      )}

                      <div>city:</div>
                      {(!customerData.deliveryDetails ||
                        !customerData.deliveryDetails.city) && (
                        <input {...register("city")} />
                      )}

                      {customerData.deliveryDetails &&
                        customerData.deliveryDetails.city && (
                          <input
                            defaultValue={customerData.deliveryDetails.city}
                            {...register("city")}
                          />
                        )}

                      {/* <div>Street:</div>

                    <input
                      defaultValue={customerData.street}
                      {...register("street")}
                    /> */}
                      <div>State:</div>
                      {(!customerData.deliveryDetails ||
                        !customerData.deliveryDetails.state) && (
                        <input {...register("state")} />
                      )}

                      {customerData.deliveryDetails &&
                        customerData.deliveryDetails.state && (
                          <input
                            defaultValue={customerData.deliveryDetails.state}
                            {...register("state")}
                          />
                        )}

                      {/* <div>State:</div>

                    <input
                      defaultValue={customerData.state}
                      {...register("state")}
                    /> */}
                      <div>Zip Code:</div>
                      {(!customerData.deliveryDetails ||
                        !customerData.deliveryDetails.zipCode) && (
                        <input {...register("zipCode")} />
                      )}

                      {customerData.deliveryDetails &&
                        customerData.deliveryDetails.zipCode && (
                          <input
                            defaultValue={customerData.deliveryDetails.zipCode}
                            {...register("zipCode")}
                          />
                        )}
                      {/* 
                    <div>Zip Code:</div>

                    <input
                      defaultValue={customerData.zipCode}
                      {...register("zipCode")}
                    /> */}
                      <div>Country:</div>
                      {(!customerData.deliveryDetails ||
                        !customerData.deliveryDetails.country) && (
                        <input {...register("country")} />
                      )}

                      {customerData.deliveryDetails &&
                        customerData.deliveryDetails.country && (
                          <input
                            defaultValue={customerData.deliveryDetails.country}
                            {...register("country")}
                          />
                        )}

                      {/* <div>Country:</div>

                    <input
                      defaultValue={customerData.country}
                      {...register("country")}
                    /> */}

                      <button className="details-submitButton">submit</button>
                    </div>
                  }
                </form>
              )}
            </div>

            {toggleCard && (
              <div>
                <div className="details-paymentInfo">
                  <h3>card details</h3>
                  {stripeData &&
                    stripeData.default_source &&
                    cardConfirmation && <div>we have your information ✅</div>}

                  {stripeData && (
                    <form onSubmit={handleSubmit(cardSubmit)}>
                      <div>
                        <div className="ilblock">
                          <div className="details-payment-info-cn">
                            card number:
                          </div>

                          <input
                            className="details-paymentInfo-num"
                            {...register("number")}
                          />
                        </div>

                        <div className="details-paymentInfo-cvc-block">
                          <div className="ilblock">cvc:</div>

                          <input
                            {...register("cvc")}
                            className="details-paymentInfo-cvc inlblock"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="ilblock">
                          <div>month:</div>

                          <input
                            {...register("exp_month")}
                            className="details-paymentInfo-exp"
                          />
                        </div>
                        <div className="ilblock details-paymentInfo-exp-blockyear">
                          <div>year:</div>

                          <input
                            {...register("exp_year")}
                            className="details-paymentInfo-exp"
                          />
                        </div>
                        <button className="details-paymentInfo-button">
                          submit
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsContainer;
