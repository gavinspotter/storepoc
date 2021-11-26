import React, { useContext, useEffect, useState } from "react";

import { useHttpClient } from "../../shared/hooks/http-hook";

import { AuthContext } from "../../shared/context/auth-context";

const MessageBoardsItem = (props) => {
  const auth = useContext(AuthContext);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [assignCustomer, setAssignCustomer] = useState();

  useEffect(() => {
    const fetchCustomer = async () => {
      const requestData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/admin/getCustomer/${props.consumer}`,
        "GET",
        null,
        {
          //"Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      console.log(requestData);

      setAssignCustomer(requestData.findConsumer);
    };

    fetchCustomer();
  }, [sendRequest, auth.token, props.consumer]);

  const setContext = () => {
    auth.setMessageRef(props.consumer);
    auth.setMessageBoardId(props.messageBoard);
  };

  return (
    <div onClick={setContext} className="adminMessages-messageBoards-item">
      {assignCustomer && (
        <div>
          {assignCustomer.firstName} {assignCustomer.lastName} <br />
          {assignCustomer.email}{" "}
        </div>
      )}
    </div>
  );
};

export default MessageBoardsItem;
