import React from "react";
import { NavLink } from "react-router-dom";

const Nav = (props) => {

  const handleClick = (query) => {
    props.changeQuery(query);
  };

  return ( 
    <nav className="main-nav">
      <ul>
        <li>
          <NavLink className ='navlink-button' to='/search/cats' onClick={() => handleClick('cats')}>Cats</NavLink>
        </li>
        <li>
          <NavLink className ='navlink-button' to='/search/dogs' onClick={() => handleClick('dogs')}>Dogs</NavLink>
        </li>
        <li>
          <NavLink className ='navlink-button' to='/search/computers' onClick={() => handleClick('computers')}>Computers</NavLink>
        </li>
      </ul>
    </nav>
  );

};

export default Nav;
