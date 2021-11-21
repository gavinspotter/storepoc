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
                        Authorization: 'Bearer ' + auth.token 
                    }

                )

                setMessages(responseData.findMessageBoard.messages)
                window.scrollTo(0, 99999)
            } catch (err) {
                
            }
        }

        fetchMessages();



        

    }, [sendRequest, auth.token])



    return (
        <div>


            

            
            { messages &&
                
                <ChatList
            messages={messages}
            />}

            <form>
                <textarea>

                </textarea>
            </form>
        </div>
    )
}

export default CustomerChatBox
