import React from 'react'

import "../../css/style.css"

import { NavLink } from "react-router-dom";

const NavBar = () => {
    return (
        <div className="navbar">
            <div className="navbar--left">
                <NavLink to="/">About Us</NavLink>
            </div>
            <div className="navbar--right">
                <NavLink className="navbar--right-bulk" to="/bulkItems">Bulk</NavLink>
                <NavLink className="navbar--right-retail" to="/consumerGoods">Retail</NavLink>
                <NavLink className="navbar--right-login" to="/welcome">Login</NavLink>
            </div>
        </div>
    )
}

export default NavBar
