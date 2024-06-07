import React from "react";
//import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, Container } from "react-bootstrap";

const NavBar = () => {
 return (
 <nav>
       <div className="row col-sm-12" style={{background: "lightblue", padding: "1%"}}>
          <div className="col-sm-2">
             <NavLink  to="/">Home</NavLink >
          </div>
          <div className="col-sm-2">
             <NavLink  to="/dataView">Data View</NavLink >
          </div>
       </div>
 </nav>
 );
};

export default NavBar;