import React, { useEffect } from "react";
import Photo from "./Photo";
import NotFound from "./NotFound";

const PhotoList = (props) => {
  const results = props.data;
  let photos;

  /* Map through the photo data and create Photo components for each photo
   using the photo's URL, title, and key/id as props. */
  if (results.length > 0) {
    photos = results.map((photo) => (
      <Photo
        url={`https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`}
        title={photo.title}
        key={photo.id}
      />
    ));
  } else {  
      photos = <NotFound />;
  }

  return <ul key="photo-list">{photos}</ul>;
};

export default PhotoList;
