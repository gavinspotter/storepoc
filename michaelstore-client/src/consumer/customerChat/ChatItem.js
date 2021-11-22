import React, { useContext } from 'react'

import { AuthContext } from '../../shared/context/auth-context'

const ChatItem = (props) => {


    const auth= useContext(AuthContext)

    console.log(props.sender)
    console.log(auth.customerId)
    


    return (
        <div >
            { auth.customerId === props.sender &&
                <div>me</div>}
            { !auth.customerId === props.sender &&
                
                <div>buyz</div>}
            <div>{props.message}</div>
        </div>
    )
}

export default ChatItem
