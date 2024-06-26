import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContex } from "../../contex/login-contex";
import "./NavLinks.css";

const NavLinks = (props) => {
  const auth = useContext(AuthContex);

  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          ALL USERS
        </NavLink>
      </li>
      {auth.isLoggedIn && (
        <li>
          <NavLink to={`/${auth.userId}/places`}>MY PLACES</NavLink>
        </li>
      )}

      {auth.isLoggedIn && (
        <li>
          <NavLink to="/places/new">ADD PLACE</NavLink>
        </li>
      )}

      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/auth">AUTHENTICATE</NavLink>
        </li>
      )}

      {auth.isLoggedIn && (<li><button onClick={auth.logout}>Logout</button></li>)}
    </ul>
  );
};

export default NavLinks;
