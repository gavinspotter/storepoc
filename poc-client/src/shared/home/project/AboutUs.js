import React, { useContext } from 'react'

import { AuthContext } from '../../context/auth-context'

import '../../../css/style.css'

const AboutUs = () => {


    const auth = useContext(AuthContext)


    return (
        <div className="logout">
            <label onClick={auth.logout}>logout</label>
        </div>
    )
}

export default AboutUs
