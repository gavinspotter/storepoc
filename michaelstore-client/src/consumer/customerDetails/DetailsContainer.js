import React, { useContext } from 'react'


import { AuthContext } from '../../shared/context/auth-context'



const DetailsContainer = () => {


    const auth = useContext(AuthContext)




    return (
        <div className="details">

            <div onClick={auth.customerLogout}> logout</div>

            <div className="details-container">
                <h3 className="details-title">Hey there, we need some details to perfect your order!</h3>
                
            </div>
        </div>
    )
}

export default DetailsContainer
