import React, {useRef, useContext, useEffect, useState} from 'react'


import { useHttpClient } from '../../shared/hooks/http-hook'
import { useForm } from "react-hook-form"


import { AuthContext } from '../../shared/context/auth-context'
import ChatList from './ChatList'
import ErrorModal from '../../shared/UIElements/ErrorModal'

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

    const [mTrigger, setmTrigger] = useState()



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

        setmTrigger(false)



        

    }, [sendRequest, mTrigger, auth.customerToken])

    const titleRef = useRef()

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
                    Authorization: 'Bearer ' + auth.customerToken

                }
            )
        } catch (err) {
            
        }

        setmTrigger(true)


        // const fetchMessages = async () => {
        //     try {
        //         const responseData = await sendRequest(
        //             `${process.env.REACT_APP_BACKEND_URL}/customer/getMessages`,
        //             "GET",
        //             null,
        //             {
        //                 //"Content-Type": "application/json",
        //                 Authorization: 'Bearer ' + auth.customerToken 
        //             }

        //         )

        //         setMessages(responseData.findMessageBoard.messages)
               
        //     } catch (err) {
                
        //     }
        // }

        // fetchMessages();

        // function handleBackClick() {
        //     titleRef.current.scrollIntoView({ behavior: 'smooth' })
        // }

        // handleBackClick()

        

        

    }

   



  

 



    return (
        <div className="customerMessage">
            <ErrorModal
            error={error} onClear={clearError}
            />
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
                <textarea {...register("messages")} className="customerMessage-form-textArea-input"/>
                </div>
                
                </div>

            </form>
            </div>
        </div>
    )
}

export default CustomerChatBox
