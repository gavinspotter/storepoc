import React from 'react'
import ChatItem from './ChatItem'

const ChatList = (props) => {
    return (
        <div className="customerMessage-messages">
            {
                props.messages.map(x => 
                    <ChatItem
                    key={x._id}
                    sender={x.sender}
                    message={x.message}
                    />
                    ).reverse()
            }
            
        </div>
    )
}

export default ChatList
