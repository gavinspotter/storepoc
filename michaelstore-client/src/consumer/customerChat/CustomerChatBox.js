import React, {useContext, useEffect, useState} from 'react'


import { useHttpClient } from '../../shared/hooks/http-hook'
import { useForm } from "react-hook-form"


import { AuthContext } from '../../shared/context/auth-context'
import ChatList from './ChatList'

const CustomerChatBox = () => {

    const auth = useContext(AuthContext)

    const { isLoading, error, sendRequest, clearError } = useHttpClient()
    
    const { register, handleSubmit, reset,formState: { isSubmitSuccessful }  } = useForm({message: ''})


    useEffect(() => {
        if (isSubmitSuccessful) {
          reset({message:""})
        }
          
    },
    [reset, isSubmitSuccessful])

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
                        Authorization: 'Bearer ' + auth.customerToken 
                    }

                )

                setMessages(responseData.findMessageBoard.messages)
                console.log(responseData.findMessageBoard.messages)
                //window.scrollTo(0, 99999)
            } catch (err) {
                
            }
        }

        fetchMessages();



        

    }, [sendRequest, auth.customerToken])

    const submitAMessage = async (data) => {

        try {
            sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}/customer/postMessage`,
                "POST",
                JSON.stringify({
                    message: data.messages,
                     
                    
                }),
                {
                    "Content-Type": "application/json",
                    Authorization: 'Bearer ' + auth.token 

                }
            )
        } catch (err) {
            
        }

    }


    return (
        <div className="customerMessage">
            { messages &&
                
                <ChatList 
            messages={messages}
            />}
            <div className="customerMessage-items">

            </div>


            

            
            

            <div className="customerMessage-form-border">
            

            <form className="customerMessage-form"  onSubmit={handleSubmit(submitAMessage)}>

                <div className="customerMessage-form-form">
              
                <button className="customerMessage-form-button">submit</button>
                <div className="customerMessage-form-textArea">
                <textarea className="customerMessage-form-textArea-input"/>
                </div>
                
                </div>

            </form>
            </div>
        </div>
    )
}

export default CustomerChatBox
