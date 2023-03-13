import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate} from "react-router-dom";
import "./App.css";
import axios from "axios";
import SearchForm from "./Components/SearchForm";
import Nav from "./Components/Nav";
import PhotoList from "./Components/PhotoList";
import apiKey from "./config";
import ErrorPage from "./Components/ErrorPage";

function App() {
  const [query, setQuery] = useState("cats");
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  const photoApiKey = apiKey;

  useEffect(() => {
    setLoading(true);
    let activeFetch = true;
    axios
      .get(
        `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${photoApiKey}&tags="${query}"&per_page=24&format=json&nojsoncallback=1`
      )
      .then((response) => {
        // handle success
        if (activeFetch) {
          //for testing - remove later
          console.log(query);
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
  }, [photoApiKey,query ]);

  //Handler for the search form
  const handleQueryChange = (searchText) => {
    setQuery(searchText);
  };

  //Click handler for the navigation links
  const handleNavigationClick = (query) => {
    setQuery(query);
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
                 <Route path="/" element={<Navigate to="/search/cats" />} />
 
                <Route path="/search/:query" element={<PhotoList data={photos} />}/>
                
                {/*to work on later*/}
                <Route path="/search/cats" element=<PhotoList data={photos}/> />
                <Route path="/search/dogs" element=<PhotoList data={photos} /> />
                <Route path="/search/computers" element=<PhotoList data={photos} /> />
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
