import React, { useState } from "react";
import "./Dictionary.css";
import Results from "./Results";
import Photos from "./Photos";
import axios from "axios";

export default function Dictionary() {
  let [keyword, setKeyword] = useState("dictionary");
  let [results, setResults] = useState(null);
  let [loaded, setLoaded] = useState(false);
  let [photos, setPhotos] = useState(null);

  function handleResponse(response) {
    setResults(response.data[0]);
  }

  function handleImage(response) {
    setPhotos(response.data.photos);
  }

  function search() {
    let apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${keyword}`;
    axios.get(apiUrl).then(handleResponse);

    let imageApiKey = "3624e238ob48383a305ee4a6fdaat7fb";
    let imageApiUrl = `https://api.shecodes.io/images/v1/search?query=${keyword}&key=${imageApiKey}`;
    axios
      .get(imageApiUrl, {
        headers: { Authorization: `Bearer ${imageApiKey}` },
      })
      .then(handleImage);
  }

  function handleSubmit(event) {
    event.preventDefault();
    search();
  }

  function handleKeywordChange(event) {
    setKeyword(event.target.value);
  }

  function load() {
    setLoaded(true);
    search();
  }

  if (loaded) {
    return (
      <div className="Dictionary">
        <section>
          <h1>What word do you want to look up?</h1>
          <form onSubmit={handleSubmit}>
            <input
              className="search-input"
              type="search"
              onChange={handleKeywordChange}
              defaultValue="dictionary"
            />
          </form>
          <div className="hint">
            suggested words: sunset, forest, plants, water
          </div>
        </section>
        <Results results={results} />
        <Photos photos={photos} />
      </div>
    );
  } else {
    load();
    return "Loading";
  }
}
