import React from "react";
import MessageItem from "./MessageItem";

const MessagesList = (props) => {
  return (
    <div className="adminMessages-messageContainer-messages">
      {<div ref={props.scroll}></div>}
      {props.items
        .map((x) => (
          <MessageItem key={x._id} sender={x.sender} message={x.message} />
        ))
        .reverse()}
    </div>
  );
};

export default MessagesList;
