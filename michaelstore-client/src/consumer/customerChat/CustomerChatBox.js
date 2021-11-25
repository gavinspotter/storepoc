import React, { useRef, useContext, useEffect, useState } from "react";

import { useHttpClient } from "../../shared/hooks/http-hook";
import { useForm } from "react-hook-form";

import { AuthContext } from "../../shared/context/auth-context";

import ErrorModal from "../../shared/UIElements/ErrorModal";
import ChatItem from "./ChatItem";
import CustomerItemsList from "./CustomerItemsList";

const CustomerChatBox = () => {
  const auth = useContext(AuthContext);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm({ message: "" });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({ message: "" });
    }
  }, [reset, isSubmitSuccessful]);

  const [messages, setMessages] = useState();

  const [mTrigger, setmTrigger] = useState();

  const titleRef = useRef();

  const handleBackClick = () => {
    console.log("check");
    titleRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const setTimeScroll = () => {
    setTimeout(handleBackClick, 1000);
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/customer/getMessages`,
          "GET",
          null,
          {
            //"Content-Type": "application/json",
            Authorization: "Bearer " + auth.customerToken,
          }
        );

        setMessages(responseData.findMessageBoard.messages);

        //window.scrollTo(0, 99999)
      } catch (err) {}
    };

    fetchMessages();

    setmTrigger(false);
  }, [sendRequest, mTrigger, auth.customerToken]);

  const submitAMessage = async (data) => {
    try {
      sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/customer/postMessage`,
        "POST",
        JSON.stringify({
          message: data.messages,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.customerToken,
        }
      );
    } catch (err) {}

    setmTrigger(true);

    // const fetchMessages = async () => {
    //     try {
    //         const responseData = await sendRequest(
    //             `${process.env.REACT_APP_BACKEND_URL}/customer/getMessages`,
    //             "GET",
    //             null,
    //             {
    //                 //"Content-Type": "application/json",
    //                 Authorization: 'Bearer ' + auth.customerToken
    //             }

    //         )

    //         setMessages(responseData.findMessageBoard.messages)

    //     } catch (err) {

    //     }
    // }

    // fetchMessages();

    //

    // handleBackClick()
  };

  const [grabItems, setGrabItems] = useState();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/customer/items`,
          "GET",
          null,
          {
            //"Content-Type": "application/json",
            Authorization: "Bearer " + auth.customerToken,
          }
        );

        console.log(responseData);
        setGrabItems(responseData.findGoods);
      } catch (err) {}
    };

    fetchItems();
  }, [sendRequest, auth.customerToken]);

  return (
    <div className="customerMessage">
      <ErrorModal error={error} onClear={clearError} />
      {messages && (
        <div className="customerMessage-messages">
          <div className="customerMessage-messages-messages">
            {<div ref={titleRef}></div>}

            {messages
              .map((x) => (
                <ChatItem key={x._id} sender={x.sender} message={x.message} />
              ))
              .reverse()}
          </div>
        </div>
      )}
      <div className="customerMessage-items">
        {grabItems && <CustomerItemsList items={grabItems} />}
      </div>

      <div className="customerMessage-form-border">
        <form
          className="customerMessage-form"
          onSubmit={handleSubmit(submitAMessage)}
        >
          <div className="customerMessage-form-form">
            <button
              onClick={setTimeScroll}
              className="customerMessage-form-button"
            >
              submit
            </button>
            <div className="customerMessage-form-textArea">
              <textarea
                {...register("messages")}
                className="customerMessage-form-textArea-input"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerChatBox;
