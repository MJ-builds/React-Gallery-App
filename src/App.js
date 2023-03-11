import React, {useState, useEffect} from 'react';
import './App.css';
import axios from "axios";
import SearchForm from './Components/SearchForm';
import Navigation from './Components/Navigation';
import PhotoList from './Components/PhotoList';
import apiKey from './config';

function App() {

  const [query, setQuery] = useState("garden");
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  const photoApiKey = apiKey;

  useEffect(() => {
    setLoading(true);
    let activeFetch = true;
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${photoApiKey}&tags="${query}"&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
        // handle success
        if (activeFetch) {
          setPhotos(response.data.photos.photo);
          setLoading(false);
        }
      })
      .catch(error => {
        // handle error
        console.log("Error fetching and parsing data", error);
      });
      return () => { activeFetch = false }
  }, [query]);

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
      <SearchForm changeQuery={handleQueryChange}/>
      <Navigation changeQuery={handleNavigationClick}/>
      <div className="photo-container">
      {(loading)
          ? <p>Loading...</p>
          : <PhotoList data={photos}/> 
      }
      </div>
      </div>
      </header>
    </div>
  );
};

export default App;
