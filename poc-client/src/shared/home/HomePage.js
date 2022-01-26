import React from 'react'
import NavBar from './NavBar'

const HomePage = (props) => {
    return (
        <div>
            <NavBar/>
            {props.children}
        </div>
    )
}

export default HomePage
