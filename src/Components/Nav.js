import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Nav = (props) => {

  const navigate = useNavigate();

  const handleClick = (query) => {
    props.changeQuery(query);
    // navigate to corresponding route using `navigate/useNagivate` function
    navigate(`/${query}`);
  };

  return ( 
    <nav className="main-nav">
      <ul>
        <li>
          <NavLink to='/search/cats' onClick={() => handleClick('cat')}>Cats</NavLink>
        </li>
        <li>
          <NavLink to='/search/dogs' onClick={() => handleClick('dog')}>Dogs</NavLink>
        </li>
        <li>
          <NavLink to='/search/computers' onClick={() => handleClick('computer')}>Computers</NavLink>
        </li>
      </ul>
    </nav>
  );

};

export default Nav;
