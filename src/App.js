import React, {useState, useRef} from 'react';
import './App.css';
import axios from "axios";
import SearchForm from './Components/SearchForm';
import Navigation from './Components/Navigation';
import Photo from './Components/Photo';
import apiKey from './config';

function App() {

  const [query, setQuery] = useState("");

  const photoApiKey = apiKey;

  const handleQueryChange = (searchText) => {
    setQuery(searchText);
  };

  return (
    <div className="App">
      <header className="App-header">
      <div className="container">
      <SearchForm changeQuery={handleQueryChange}/>
      <Navigation />
      <Photo />
      </div>
      </header>
    </div>
  );
}

export default App;
