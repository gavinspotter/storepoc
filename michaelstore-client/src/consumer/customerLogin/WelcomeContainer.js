import React, { useState } from 'react'

import "../../css/style.css"
import Login from './Login'
import Signup from './Signup'

const WelcomeContainer = () => {


    const [toggleEntry, setToggleEntry] = useState(true)


    const theToggle = () => {
        if(toggleEntry === true){
            setToggleEntry(false)
        }else if(toggleEntry === false){
            setToggleEntry(true)
        }
    }


    return (
        <div className="welcome">

        <div className="welcome--intro">
            <h1>
                Welcome!
            </h1>
            <p> Here at example.com we value your patronage. Login to save card details, edit delivery details, and chat about incoming orders. Thanks for shopping with us!</p>

        </div>

        {
            toggleEntry &&
            <div className="welcome--welcome">
            <Login/>
            <p className="welcome--welcome--text">did you mean <div onClick={theToggle}>signup?</div></p>
            </div>
        }
        {
            !toggleEntry &&
            <div className="welcome--welcome">
            <Signup/> 
            <p className="welcome--welcome--text">did you mean <div onClick={theToggle}>login?</div></p>
            </div>
        }
            
        </div>
    )
}

export default WelcomeContainer
