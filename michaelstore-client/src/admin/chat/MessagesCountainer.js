import React, { useRef, useContext, useEffect, useState } from "react";

import { useHttpClient } from "../../shared/hooks/http-hook";
import { useForm } from "react-hook-form";

import { AuthContext } from "../../shared/context/auth-context";

import MessageBoardsList from "./MessageBoardsList";
import MessagesList from "./MessagesList";
import ErrorModal from "../../shared/UIElements/ErrorModal";

const MessagesCountainer = () => {
  const auth = useContext(AuthContext);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm({ message: "" });

  const titleRef = useRef();

  const handleBackClick = () => {
    console.log("check");
    titleRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const setTimeScroll = () => {
    setTimeout(handleBackClick, 1000);
  };

  const [messageBoards, setMessageBoards] = useState();

  const [mTrigger, setmTrigger] = useState();

  const [messages, setMessages] = useState();

  useEffect(() => {
    const fetchMessageBoards = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/admin/getMessages`,
          "GET",
          null,
          {
            //"Content-Type": "application/json",
            Authorization: "Bearer " + auth.token,
          }
        );

        const getRef = responseData.findMessages.find(
          (x) => x.consumer === auth.messageRef
        );
        setMessages(getRef);
        console.log(getRef);
        setMessageBoards(responseData.findMessages);
      } catch (err) {}
    };

    fetchMessageBoards();
  }, [sendRequest, auth.token, auth.messageRef]);

  const submitAMessage = async (data) => {
    try {
      sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/admin/postMessage`,
        "POST",
        JSON.stringify({
          message: data.messages,
          messageBoardId: auth.messageBoardId,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
    } catch (err) {}

    setmTrigger(true);
  };

  return (
    <div className="adminMessages">
      <ErrorModal error={error} onClear={clearError} />
      <div className="adminMessages-messageBoards">
        {messageBoards && <MessageBoardsList items={messageBoards} />}
      </div>
      <div className="adminMessages-messageContainer">
        {messages && (
          <MessagesList scroll={titleRef} items={messages.messages} />
        )}
      </div>
      <div className="adminMessages-form-border">
        <form
          className="adminMessages-form"
          onSubmit={handleSubmit(submitAMessage)}
        >
          <div className="adminMessages-form-form">
            <button
              onClick={setTimeScroll}
              className="adminMessages-form-button"
            >
              submit
            </button>
            <div className="adminMessages-form-textArea">
              <textarea
                {...register("messages")}
                className="adminMessages-form-textArea-input"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MessagesCountainer;
