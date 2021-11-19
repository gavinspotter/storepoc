import React, { useEffect, useState, useContext } from 'react'


import { useHttpClient } from '../../../hooks/http-hook'
import ConsumerGoodsList from './ConsumerGoodsList'

import { GlobalContext } from '../../../context/global-context'

import "../../../../css/style.css"

const ConsumerGoodsContainer = () => {

    const { isLoading, error, sendRequest, clearError } = useHttpClient()

    const globalC = useContext(GlobalContext)


    const [consumerGoodsList, setConsumerGoodsList] = useState()


    useEffect(() => {

        const fetchcg = async () => {
            try {
                const responseData = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}/admin/getConsumerItems`,
                
                    
                )
                
                setConsumerGoodsList(responseData.findConsumerItems)
    
            } catch (err) {
    
            }
        }

        fetchcg()

        

    },[sendRequest, globalC.context])





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
