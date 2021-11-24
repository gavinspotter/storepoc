import React, { useContext, useEffect, useState } from "react";

import { useForm } from "react-hook-form";

import { AuthContext } from "../../shared/context/auth-context";

import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/UIElements/LoadingSpinner";

const DetailsContainer = () => {
  const auth = useContext(AuthContext);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const { register, handleSubmit } = useForm();

  const [customerData, setCustomerData] = useState();

  const [stripeData, setStripeData] = useState();

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
    };

    fetchData();
  }, [sendRequest, auth.customerToken]);

  const detailsSubmit = async (data) => {
    try {
      await sendRequest(
        `http://localhost:5000/customer/updateDetails`,
        "PATCH",
        JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          street: data.street,
          city: data.city,
          country: data.country,
          zipCode: data.zipCode,
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
  };

  const [editDelivery, setEditDelivery] = useState(false);

  const toggleEditDelivery = () => {
    if (editDelivery === true) {
      setEditDelivery(false);
    } else {
      setEditDelivery(true);
    }
  };

  const [toggleFirstName, setFirstName] = useState();

  const toggleFirstNameFunc = () => {
    if (toggleFirstName === true) {
      setFirstName(false);
    } else {
      setFirstName(true);
    }
  };

  return (
    <div className="details">
      <ErrorModal error={error} onClear={clearError} />

      {/* {isLoading && <LoadingSpinner  asOverlay/>} */}

      <div onClick={auth.customerLogout}> logout</div>

      <div className="details-container">
        <h3 className="details-title">
          Hey there, we need some details to perfect your order(s)!
        </h3>

        <div className="details-form">
          <form onSubmit={handleSubmit(detailsSubmit)}>
            <div className="details-delivInfo">
              {customerData && stripeData && (
                <div>
                  <h3>delivery details</h3>

                  <div>
                    {!customerData.firstname && (
                      <div>
                        <div>First Name:</div>

                        <input {...register("firstName")} />
                      </div>
                    )}

                    {customerData.firstName && (
                      <div>
                        <div>First Name:</div> ✅
                        <span onClick={toggleFirstNameFunc}>edit</span>
                        {toggleFirstName && (
                          <input
                            defaultValue={customerData.firstName}
                            {...register("firstName")}
                          />
                        )}
                      </div>
                    )}

                    <div>Last Name:</div>

                    <input
                      defaultValue={customerData.lastName}
                      {...register("lastName")}
                    />

                    <div>Last Name:</div>

                    <input
                      defaultValue={customerData.lastName}
                      {...register("lastName")}
                    />

                    <div>Street:</div>

                    <input
                      defaultValue={customerData.street}
                      {...register("street")}
                    />

                    <div>Street:</div>

                    <input
                      defaultValue={customerData.street}
                      {...register("street")}
                    />
                    <div>State:</div>

                    <input
                      defaultValue={customerData.state}
                      {...register("state")}
                    />

                    <div>State:</div>

                    <input
                      defaultValue={customerData.state}
                      {...register("state")}
                    />
                    <div>Zip Code:</div>

                    <input
                      defaultValue={customerData.zipCode}
                      {...register("zipCode")}
                    />

                    <div>Zip Code:</div>

                    <input
                      defaultValue={customerData.zipCode}
                      {...register("zipCode")}
                    />
                    <div>Country:</div>

                    <input
                      defaultValue={customerData.country}
                      {...register("country")}
                    />

                    <div>Country:</div>

                    <input
                      defaultValue={customerData.country}
                      {...register("country")}
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="details-paymentInfo">
              <h3>card details</h3>
              {stripeData && !stripeData.default_source && (
                <div>
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

                    <div className="ilblock details-paymentInfo-cvc-block">
                      <div {...register("cvc")}>cvc:</div>

                      <input className="details-paymentInfo-cvc" />
                    </div>
                  </div>
                  <div>
                    <div className="ilblock">
                      <div {...register("exp_month")}>month:</div>

                      <input className="details-paymentInfo-exp" />
                    </div>
                    <div className="ilblock details-paymentInfo-exp-blockyear">
                      <div {...register("exp_year")}>year:</div>

                      <input className="details-paymentInfo-exp" />
                    </div>
                  </div>
                </div>
              )}
            </div>
            <button className="details-submitButton">submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DetailsContainer;
