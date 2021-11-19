import React, {useContext, useEffect, useState} from 'react'


import { useHttpClient } from '../../shared/hooks/http-hook'

import { AuthContext } from '../../shared/context/auth-context'




import MessageBoardsList from './MessageBoardsList'



const MessagesCountainer = () => {


    const auth = useContext(AuthContext)

    const { isLoading, error, sendRequest, clearError } = useHttpClient()

    const [messageBoards, setMessageBoards] = useState()

    useEffect(() => {

        const fetchMessageBoards = async () => {
            try {
                const responseData = await sendRequest(
                    `http://localhost:5000/api/admin/getMessages`,
                    "GET",
                    null,
                    {
                        //"Content-Type": "application/json",
                        Authorization: 'Bearer ' + auth.token 
                    }

                
                    
                )
                
                setMessageBoards(responseData.findMessages)
          
            } catch (err) {
    
            }
        }

        fetchMessageBoards()

        

    },[sendRequest, auth.token])


    return (
        <div>
            <MessageBoardsList
            items={messageBoards}
            />
            
        </div>
    )
}

export default MessagesCountainer
