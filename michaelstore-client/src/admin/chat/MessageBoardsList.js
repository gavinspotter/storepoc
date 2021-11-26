import React from "react";
import MessageBoardsItem from "./MessageBoardsItem";

const MessageBoardsList = (props) => {
  return (
    <div>
      {props.items &&
        props.items.map((x) => (
          <MessageBoardsItem
            key={x._id}
            messages={x.messages}
            consumer={x.consumer}
            hidden={x.hidden}
          />
        ))}
    </div>
  );
};

export default MessageBoardsList;
