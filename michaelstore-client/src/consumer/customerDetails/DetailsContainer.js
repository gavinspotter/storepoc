import React, { useContext } from 'react'


import { AuthContext } from '../../shared/context/auth-context'



const DetailsContainer = () => {


    const auth = useContext(AuthContext)


    

    return (
        <div>
            <div onClick={auth.customerLogout}> logout</div>
        </div>
    )
}

export default DetailsContainer
