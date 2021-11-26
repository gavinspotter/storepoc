import React, { useContext } from "react";

import { AuthContext } from "../../shared/context/auth-context";

const MessageItem = (props) => {
  const auth = useContext(AuthContext);

  const sender =
    props.sender === auth.userId ? (
      <div className="ilblock">me</div>
    ) : (
      <div className="ilblock">customer</div>
    );

  return (
    <div className="adminMessages-aMessage">
      <div className="ilblock">{sender}</div>{" "}
      <div className="ilblock">{props.message}</div>
    </div>
  );
};

export default MessageItem;
