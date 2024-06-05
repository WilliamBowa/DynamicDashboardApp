import React from "react";
//import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, Container } from "react-bootstrap";

const NavBar = () => {
 return (
 <nav>
       <div className="row">
          <div>
             <NavLink  to="/">Home</NavLink >
          </div>
          <div>
             <NavLink  to="/dataView">Data View</NavLink >
          </div>
       </div>
 </nav>
 );
};

export default NavBar;