import React, { useState, useContext } from 'react'


import {useHttpClient} from "../../shared/hooks/http-hook"

import {AuthContext} from "../../shared/context/auth-context"

import { useForm } from "react-hook-form"



import ErrorModal from '../../shared/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/UIElements/LoadingSpinner'



const AddItemContainer = () => {


    const auth = useContext(AuthContext)

    const { register, handleSubmit } = useForm()


    const { isLoading, error, sendRequest, clearError } = useHttpClient()


    const [toggleItem, setToggleItem] = useState()

    


    const submitConsumerItem = async (data) => {

    
        console.log(data.name)
        console.log(data)
        try {

        
    
   
            //const fileContent = fs.readFileSync(data.image[0])
            const formData = new FormData();
            formData.append("bucketPhotoId", data.image[0])
            formData.append("name", data.name)
            formData.append("description", data.description)
            formData.append("price", data.price)

           


            await sendRequest(
                `http://localhost:5000/api/admin/createConsumerItem`,
                "POST",
                // JSON.stringify({
                //     name: data.name,
                //     description: data.description,
                //     price: data.price,
                //     bucketPhotoId: data.image[0]
                    
                // }),

                 formData,

                
                {
                    //"Content-Type": "application/json",
                    Authorization: 'Bearer ' + auth.token 
                }
            )
            
        } catch (err) {
            console.log(err)
        }


    }




    return (
        <div>
            <ErrorModal
            error={error} onClear={clearError}
            />
            {isLoading &&
            <LoadingSpinner asOverlay/>}

            <form onSubmit={handleSubmit(submitConsumerItem)}>
                <input  {...register("image")} type="file" accept=".jpg,.png,.jpeg"/>
                <input  {...register("name")}/>
                <input {...register("description")}/>
                <input {...register("price")} type="number"/>
                <button>submit</button>
            </form>
            <button onClick={auth.logout}>logout</button>

            
        </div>
    )
}

export default AddItemContainer
