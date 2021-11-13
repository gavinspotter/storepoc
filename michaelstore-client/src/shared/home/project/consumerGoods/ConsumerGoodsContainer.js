import React, { useEffect, useState } from 'react'


import { useHttpClient } from '../../../hooks/http-hook'
import ConsumerGoodsList from './ConsumerGoodsList'

import "../../../../css/style.css"

const ConsumerGoodsContainer = () => {

    const { isLoading, error, sendRequest, clearError } = useHttpClient()


    const [consumerGoodsList, setConsumerGoodsList] = useState()


    useEffect(() => {

        const fetchcg = async () => {
            try {
                const responseData = await sendRequest(
                    `http://localhost:5000/api/admin/getConsumerItems`,
                
                    
                )
                
                setConsumerGoodsList(responseData.findConsumerItems)
    
            } catch (err) {
    
            }
        }

        fetchcg()

        

    },[sendRequest])





    return (
        <div className="consumerGoods-block">
            { consumerGoodsList &&
            <ConsumerGoodsList
            items={consumerGoodsList}
            />}
        </div>
    )
}

export default ConsumerGoodsContainer
