import React from "react";
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from "./NavbarElements";

const Navbar = () => {
  return (
    <>
      <Nav>
        <NavLink to="/">
          <h1>WorldWideWeather</h1>
        </NavLink>
        <Bars />
        <NavMenu>
          <NavLink to="/view">View</NavLink>
          <NavLink to="/home">Home</NavLink>
          <NavLink to="/signup">Sign Up</NavLink>
        </NavMenu>
        <NavBtn>
          <NavBtnLink to="/login">Log In</NavBtnLink>
        </NavBtn>
      </Nav>
    </>
  );
};
export default Navbar;
