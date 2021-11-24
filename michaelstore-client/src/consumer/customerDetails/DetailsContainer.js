import React, { useContext } from 'react'

import { useForm } from "react-hook-form"


import { AuthContext } from '../../shared/context/auth-context'

import { useHttpClient } from '../../shared/hooks/http-hook'
import ErrorModal from '../../shared/UIElements/ErrorModal'



const DetailsContainer = () => {


    const auth = useContext(AuthContext)


    const { isLoading, error, sendRequest, clearError } = useHttpClient()

    const { register, handleSubmit } = useForm()



    const loginSubmit = async (data) => {

        try {
            const responseData = await sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}/customer/login`,
                "POST",
                JSON.stringify({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    street: data.street,
                    city: data.city,
                    country: data.country,
                    zipCode: data.zipCode,
                    number: data.number,
                    exp_month: data.exp_month,
                    exp_year: data.exp_year,
                    cvc: data.cvc
                    
                }),
                {
                    "Content-Type": "application/json",
                    Authorization: 'Bearer ' + auth.customerToken
                }
            )
  
        } catch (err) {

        }


    }



    return (
        <div className="details">
            <ErrorModal
            error={error} onClear={clearError}
            />

            <div onClick={auth.customerLogout}> logout</div>

            <div className="details-container">
                <h3 className="details-title">Hey there, we need some details to perfect your order(s)!</h3>
                
                <div className="details-form">
                <form>
                    <div className="details-delivInfo">
                    <div>First Name:</div>
                    <input {...register("firstName")}/>
                    <div>Last Name:</div>
                    <input {...register("lastName")}/>
                    <div>Street:</div>
                    <input {...register("street")}/>
                    <div>State:</div>
                    <input {...register("state")}/>
                    <div>Country:</div>
                    <input {...register("country")}/>
                    <div>Zip Code:</div>
                    <input {...register("zipCode")}/>
                    </div>
                    <div className="details-paymentInfo">
                    <div>
                    <div className="ilblock"> 
                    <div className="details-payment-info-cn">card number:</div>
                    
                    <input className="details-paymentInfo-num" {...register("number")}/>
                    </div>
                    
                    <div className="ilblock details-paymentInfo-cvc-block">
                    <div {...register("cvc")} >cvc:</div>
                   
                    <input className="details-paymentInfo-cvc"/>
                    </div>
                    </div>
                    <div>
                    <div className="ilblock">
                    <div {...register("exp_month")}>month:</div>
                    
                    <input className="details-paymentInfo-exp"/>
                    </div>
                    <div className="ilblock details-paymentInfo-exp-blockyear">
                    <div {...register("exp_year")}>year:</div>
                    
                    <input className="details-paymentInfo-exp"/>
                    </div>
                    </div>
                   
                    </div>

                    
                    
                </form>
                </div>
            </div>
        </div>
    )
}

export default DetailsContainer
