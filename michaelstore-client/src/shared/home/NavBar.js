import React, { useContext } from "react";

import {
  IoHomeOutline,
  IoAddCircleOutline,
  IoAlbumsOutline,
  IoBagAddOutline,
  IoLayersOutline,
  IoLogInOutline,
} from "react-icons/io5";

import "../../css/style.css";

import { NavLink } from "react-router-dom";

import { AuthContext } from "../context/auth-context";
const NavBar = () => {
  const auth = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="navbar--left">
        <NavLink to="/">
          <IoHomeOutline />
        </NavLink>

        {/* {auth.isLoggedIn && (
          <div>
            <NavLink className="nav--left-aboutUs" to="/">
              home
            </NavLink>
          </div>
        )} */}
      </div>
      <div className="navbar--right">
        <NavLink className="navbar--right-bulk" to="/bulkItems">
          <IoLayersOutline />
        </NavLink>
        <NavLink className="navbar--right-retail" to="/consumerGoods">
          <IoBagAddOutline />
        </NavLink>
        {!auth.isLoggedIn && !auth.customerIsLoggedIn && (
          <NavLink className="navbar--right-login" to="/welcome">
            login
          </NavLink>
        )}
        {auth.customerIsLoggedIn && (
          <NavLink className="navbar--right-login" to="/details">
            details
          </NavLink>
        )}
        {auth.customerIsLoggedIn && (
          <NavLink className="navbar--right-login" to="/yourMessages">
            <IoAlbumsOutline />
          </NavLink>
        )}
        {auth.isLoggedIn && (
          <NavLink className="navbar--right-login" to="/itemQue">
            <IoLogInOutline />
          </NavLink>
        )}

        {auth.isLoggedIn && (
          <NavLink className="navbar--right-login" to="/addItem">
            <IoAddCircleOutline />
          </NavLink>
        )}
        {auth.isLoggedIn && (
          <NavLink className="navbar--right-login" to="/messages">
            <IoAlbumsOutline />
          </NavLink>
        )}
        {/* {
                    auth.isLoggedIn &&
                    
                <div className="logout" onClick={auth.logout}>x</div>
                } */}
      </div>
    </div>
  );
};

export default NavBar;
