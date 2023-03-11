import React from "react";

const Navigation = (props) => {

  const handleClick = (query) => {
    props.changeQuery(query);
  };

  return (
    <nav className="main-nav">
      <ul>
        <li>
          <a href="/search/cat" onClick={() => handleClick('cat')}>Cats</a>
        </li>
        <li>
          <a href="/search/dog" onClick={() => handleClick('dog')}>Dogs</a>
        </li>
        <li>
          <a href="/search/computer" onClick={() => handleClick('computer')}>Computers</a>
        </li>
      </ul>
    </nav>
  );

};

export default Navigation;
