import React from 'react'
import MessageBoardsItem from './MessageBoardsItem'

const MessageBoardsList = (props) => {
    return (
        <div>
            {
                props.items &&
                props.items.map(x => {
                    <MessageBoardsItem
                    key={x._id}
                    

                    />
                })
            }
        </div>
    )
}

export default MessageBoardsList
