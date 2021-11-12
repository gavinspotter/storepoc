import React, {useContext} from 'react'

import { useForm } from "react-hook-form"

import {useHttpClient} from "../../shared/hooks/http-hook"

import {AuthContext} from "../../shared/context/auth-context"
import ErrorModal from "../../shared/UIElements/ErrorModal"

const LoginContainer = () => {

    const auth = useContext(AuthContext)

    const { isLoading, error, sendRequest, clearError } = useHttpClient()

    const { register, handleSubmit } = useForm()


    const loginSubmit = async (data) => {

        try {
            const responseData = await sendRequest(
                `http://localhost:5000/api/admin/login`,
                "POST",
                JSON.stringify({
                    username: data.username,
                    password: data.password,
                    
                }),
                {
                    "Content-Type": "application/json"
                }
            )
            auth.login(responseData.userId, responseData.token)
        } catch (err) {

        }


    }



    return (
        <div>
        <ErrorModal 
        error={error} onClear={clearError}
        />

        <form onSubmit={handleSubmit(loginSubmit)}>
            <input {...register("username")}/>

            <input {...register("password")}/>
            <button>login</button>
            
        </form>
        
    </div>
    )
}

export default LoginContainer
