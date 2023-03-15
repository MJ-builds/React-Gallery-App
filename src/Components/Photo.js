import React from "react";

const Photo = (props) => {
  return (
      <li className='individual-photo'>
        <img src={props.url} alt={props.title} />
      </li>
  );
};

export default Photo;