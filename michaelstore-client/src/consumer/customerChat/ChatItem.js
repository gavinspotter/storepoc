import React, { useContext } from 'react'

import { AuthContext } from '../../shared/context/auth-context'

const ChatItem = (props) => {


    const auth= useContext(AuthContext)

    console.log(props.sender)
    console.log(auth.customerId)

    
    


    return (
        <div className="customerMessage-aMessage" >
            { auth.customerId === props.sender &&
                <div className="ilblock">me:&nbsp; </div>}
            { !auth.customerId === props.sender &&
                
                <div className="ilblock">buyz:&nbsp; </div>}
            <div className="ilblock"> {props.message}</div>
        </div>
    )
}

export default ChatItem
