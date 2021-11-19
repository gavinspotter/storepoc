import React, {useContext} from 'react'

import { useForm } from "react-hook-form"

import {useHttpClient} from "../../shared/hooks/http-hook"

import {AuthContext} from "../../shared/context/auth-context"
import ErrorModal from '../../shared/UIElements/ErrorModal'

const Login = () => {

    const auth = useContext(AuthContext)

    const { isLoading, error, sendRequest, clearError } = useHttpClient()

    const { register, handleSubmit } = useForm()


    const loginSubmit = async (data) => {

        try {
            const responseData = await sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}/customer/login`,
                "POST",
                JSON.stringify({
                    email: data.email,
                    password: data.password,
                    
                }),
                {
                    "Content-Type": "application/json"
                }
            )
            auth.customerLogin(responseData.customerId, responseData.customerToken)
        } catch (err) {

        }


    }


    return (
        <div>
            <ErrorModal 
            error={error} onClear={clearError}
            />

            <form onSubmit={handleSubmit(loginSubmit)}>
                <input {...register("email")}/>

                <input {...register("password")}/>
                <button>login</button>
                
            </form>
            
        </div>
    )
}

export default Login
