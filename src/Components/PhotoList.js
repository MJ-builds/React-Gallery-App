import React from "react";
import {useParams} from "react-router-dom";
import Photo from "./Photo";
import NotFound from "./NotFound";
import PreSearch from "./PreSearch";

//
const PhotoList = ({data}) => {
  // Extract the query parameter from the URL using useParams hook
  const {query} = useParams();
  let photos;
  let results = data;

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
    if (query) {
      photos = <NotFound />;
    } else {
      photos = <PreSearch />;
    }
  }

  return <ul key="photo-list">{photos}</ul>;
};

export default PhotoList;
