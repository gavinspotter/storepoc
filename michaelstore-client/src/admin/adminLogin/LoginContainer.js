import React, {useContext} from 'react'

import { useForm } from "react-hook-form"

import {useHttpClient} from "../../shared/hooks/http-hook"

import {AuthContext} from "../../shared/context/auth-context"
import ErrorModal from "../../shared/UIElements/ErrorModal"

import "../../css/style.css"

const LoginContainer = () => {

    const auth = useContext(AuthContext)

    const { isLoading, error, sendRequest, clearError } = useHttpClient()

    const { register, handleSubmit } = useForm()


    const loginSubmit = async (data) => {

        try {
            const responseData = await sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}/admin/login`,
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
        <div className="michaelLogin">
        <div className="michaelLogin-background">
        <ErrorModal 
        error={error} onClear={clearError}
        />

        <form onSubmit={handleSubmit(loginSubmit)}>

            <div className="michaelLogin-input-top">
            <label className="michaelLogin-input">😁</label>
            <label className="michaelLogin-input">username</label>
            <input className="michaelLogin-input" {...register("username")}/>
            <label className="michaelLogin-input">password</label>
            <input className="michaelLogin-input" {...register("password")} type="password"/>
            <button>login</button>

            </div>
            
        </form>
        
    </div>
    </div>
    )
}

export default LoginContainer
