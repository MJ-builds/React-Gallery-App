import React, { useState, useEffect, useCallback } from "react";
import { Route, Routes, useNavigate, useLocation,} from "react-router-dom";
import "./App.css";
import axios from "axios";
import SearchForm from "./Components/SearchForm";
import Nav from "./Components/Nav";
import PhotoList from "./Components/PhotoList";
import apiKey from "./config";
import ErrorPage from "./Components/ErrorPage";

function App() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const photoApiKey = apiKey;

  //Fetch photos from Flickr API
  const fetchPhotos = useCallback(
    (query) => {
      setLoading(true);
      let activeFetch = true;
      axios
        .get(
          `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${photoApiKey}&tags="${query}"&per_page=24&format=json&nojsoncallback=1`
        )
        .then((response) => {
          //handle success
          if (activeFetch) {
            setPhotos(response.data.photos.photo);
            setLoading(false);
          }
        })
        .catch((error) => {
          // handle error
          console.log("Error fetching and parsing data", error);
        });
      return () => {
        activeFetch = false;
      };
    },
    [photoApiKey]
  );

  /* Run effect when location.pathname changes to fetch photos based on the search query
   in the URL based on term after /search/ */
  useEffect(() => {
    const searchQuery = location.pathname.split("/search/")[1];
    if (searchQuery) {
      fetchPhotos(searchQuery);
    }
  }, [fetchPhotos, location.pathname]);

  /*Todo: refactor the below code - does the same thing - keeping them separate for now
  to clearly show where each function is used and what for (Nav Buttons vs Input Query) */

  //Handler for the search form
  const handleQueryChange = (searchText) => {
    navigate(`/search/${searchText}`);
  };

  //Click handler for the navigation links
  const handleNavigationClick = (query) => {
    navigate(`/search/${query}`);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <SearchForm changeQuery={handleQueryChange} />
          <Nav changeQuery={handleNavigationClick} />
          <div className="photo-container">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <Routes>
                <Route
                  path="/"
                  element={
                    <PhotoList fetchPhotos={fetchPhotos} data={photos} />
                  }
                />
                <Route
                  path="/search/:query"
                  element={
                    <PhotoList fetchPhotos={fetchPhotos} data={photos} />
                  }
                />
                <Route path="*" element={<ErrorPage />} />
              </Routes>
            )}
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
