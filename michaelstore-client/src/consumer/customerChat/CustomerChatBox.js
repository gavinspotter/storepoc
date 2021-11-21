import React, {useContext, useEffect, useState} from 'react'


import { useHttpClient } from '../../shared/hooks/http-hook'

import { AuthContext } from '../../shared/context/auth-context'
import ChatList from './ChatList'

const CustomerChatBox = () => {

    const auth = useContext(AuthContext)

    const { isLoading, error, sendRequest, clearError } = useHttpClient()

    const [messages, setMessages] = useState()



    useEffect(() => {

        const fetchMessages = async () => {
            try {
                const responseData = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}/customer/getMessages`,
                    "GET",
                    null,
                    {
                        //"Content-Type": "application/json",
                        Authorization: 'Bearer ' + auth.token 
                    }

                )

                setMessages(responseData.findMessageBoard.messages)
            } catch (err) {
                
            }
        }

        fetchMessages();



        

    }, [sendRequest, auth.token])



    return (
        <div>

            {
                !messages &&
                <div>hi</div>
            }

            
            { messages &&
                
                <ChatList
            messages={messages}
            />}
        </div>
    )
}

export default CustomerChatBox
