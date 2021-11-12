import React, {useContext} from 'react'

import "../../css/style.css"

import { NavLink } from "react-router-dom";



import {AuthContext} from "../context/auth-context"
const NavBar = () => {


    const auth = useContext(AuthContext)



    return (
        <div className="navbar">
            <div className="navbar--left">
                <NavLink to="/">about us</NavLink>
            </div>
            <div className="navbar--right">
                <NavLink className="navbar--right-bulk" to="/bulkItems">bulk</NavLink>
                <NavLink className="navbar--right-retail" to="/consumerGoods">retail</NavLink>
                {   (!auth.isLoggedIn && !auth.customerIsLoggedIn)  &&
                <NavLink className="navbar--right-login" to="/welcome">login</NavLink>}
                { auth.customerIsLoggedIn &&
                <NavLink className="navbar--right-login" to="/details">details</NavLink>
                }
                { auth.customerIsLoggedIn &&
                <NavLink className="navbar--right-login" to="/yourMessages">inbox</NavLink>
                }

                {
                    auth.isLoggedIn &&
                    <NavLink className="navbar--right-login" to="/addItem">add</NavLink>
                }
                {
                    auth.isLoggedIn &&
                    <NavLink className="navbar--right-login" to="/messages">inbox</NavLink>
                }
            </div>
        </div>
    )
}

export default NavBar
