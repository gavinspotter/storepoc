import React, { useState, useContext } from 'react'


import {useHttpClient} from "../../shared/hooks/http-hook"

import {AuthContext} from "../../shared/context/auth-context"

import { useForm } from "react-hook-form"



import ErrorModal from '../../shared/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/UIElements/LoadingSpinner'


import "../../css/style.css"


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
        <div className="addItem">
            <div className="addItem-block">
            <ErrorModal
            error={error} onClear={clearError}
            />
            {isLoading &&
            <LoadingSpinner asOverlay/>}
            
            <div className="addItem-box">
            <form onSubmit={handleSubmit(submitConsumerItem)}>
                <div className="addItem-inputs">
                
                <input  {...register("image")} type="file" accept=".jpg,.png,.jpeg"/>
                <br/>
                <label>picture</label>
                <br/>
                <label>product</label>
                <br/>
                <input  {...register("name")}/>
                <br/>
                <label>description</label>
                <br/>
                <textarea {...register("description")}/>
                <br/>
                <label>price</label>
                <br/>
                <input {...register("price")} type="number"/>
                <br/>
                <button>submit</button>
                </div>
            </form>
            
            </div>
            </div>
            
        </div>
    )
}

export default AddItemContainer
