import React, {useEffect, useState} from 'react'

import { useHttpClient } from '../../../hooks/http-hook'

import "../../../../css/style.css"

const ConsumerGoodsItem = (props) => {


    // const { isLoading, error, sendRequest, clearError } = useHttpClient()


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





    return (
        <div className="consumerGoods--card">


            
            <img className="consumerGoods--card-img" src={`https://s3.us-east-1.amazonaws.com/michaelrossbucket/${props.bucketPhotoId}`} alt={props.description}/>

            <div>
                <p>{props.name}</p>
                <p>{props.description}</p>
                <p>{props.price}</p>
            </div>
        </div>
    )
}

export default ConsumerGoodsItem
