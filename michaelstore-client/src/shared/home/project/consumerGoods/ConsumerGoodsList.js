import React from 'react'

import '../../../../css/style.css'
import ConsumerGoodsItem from './ConsumerGoodsItem'

const ConsumerGoodsList = (props) => {





    return (
        <div className="consumerGoods">
            { props.items &&
            props.items.map(x => 
                <ConsumerGoodsItem
                key={x._id}
                _id={x._id}
                name={x.name}
                description={x.description}
                price={x.price}
                bucketPhotoId={x.bucketPhotoId}

                />
                )
            }
        </div>
    )
}

export default ConsumerGoodsList
