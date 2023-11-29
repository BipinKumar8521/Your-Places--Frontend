import React from "react";
import { NavLink } from "react-router-dom";
import "./NavLinks.css";

export default function NavLinks(props) {
  return (
    <ul className="nav-links">
      <li onClick={props.onClick}>
        <NavLink to="/">ALL USERS</NavLink>
      </li>
      <li onClick={props.onClick}>
        <NavLink to="/u1/places">MY PLACES</NavLink>
      </li>
      <li onClick={props.onClick}>
        <NavLink to="/places/new">ADD PLACE</NavLink>
      </li>
      <li onClick={props.onClick}>
        <NavLink to="/auth">AUTHENTICATE</NavLink>
      </li>
    </ul>
  );
}
