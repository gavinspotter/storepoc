import React, {useEffect, useState, useContext} from 'react'

import { useHttpClient } from '../../../hooks/http-hook'

import "../../../../css/style.css"

import { AuthContext } from '../../../context/auth-context'

import {GlobalContext} from "../../../context/global-context"

import {useNavigate} from 'react-router-dom';
import ErrorModal from '../../../UIElements/ErrorModal'


const ConsumerGoodsItem = (props) => {


    const navigate = useNavigate();

    const { isLoading, error, sendRequest, clearError } = useHttpClient()

    const globalC = useContext(GlobalContext)


    const auth = useContext(AuthContext)


    // const [image, setImage] = useState()


    // useEffect(() => {

    //     const fetchcg = async () => {
    //         try {
    //             const responseData = await sendRequest(
    //                 `https://michaelrossbucket.s3.us-east-1.amazonaws.com/${props.bucketPhotoId}`,
                
                    
    //             )
                
    //             setImage(responseData)
    //             console.log(responseData.findConsumerItems)
    //         } catch (err) {
    
    //         }
    //     }

    //     fetchcg()

        

    // },[sendRequest, props.bucketPhotoId])


    const [deleteMod, setDeleteMod] = useState(false)


    const [context, setContext] = useState(null);

    const deleteAnItem = async () => {

                 try {
                        await sendRequest(
                            `http://localhost:5000/api/admin/deleteConsumerItem/${props._id}`,
                            "DELETE",
                            null,
                            {
                
                                Authorization: 'Bearer ' + auth.token 
                            }
                        
                            
                        )

                        window.location.reload();
                        navigate('/consumerGoods')

                        
                        
    
                    } catch (err) {
            
                    }


    }

    const deleteModalTrig = async () => {

        setDeleteMod(true)


    }

    const deleteModalFalse = async () => {

        setDeleteMod(false)
       
        
        // globalC({deleteModal:"trigger"})
        // console.log(globalC)


    }

    return (
        <div className="consumerGoods--card">
            <ErrorModal
            error={error} onClear={clearError}
            />

            
            <img className="consumerGoods--card-img" src={`https://s3.us-east-1.amazonaws.com/michaelrossbucket/${props.bucketPhotoId}`} alt={props.description}/>

            <div className="consumerGoods--card-text">
                <p>{props.name}</p>
                <p>{props.description}</p>
                <p>${props.price}</p>

            </div>

            <div>
                
                <div onClick={deleteModalTrig} >delete</div>
                {deleteMod &&
                <div>
                <div>are you sure you would like to delete this?</div>
   
                <div onClick={deleteAnItem}>yes</div>
                <div onClick={deleteModalFalse}>no</div>
                
                </div>
                
                }
            </div>
        </div>
    )
}

export default ConsumerGoodsItem
