import React, { useState, useEffect } from "react";
import "./style.css";
import { useDebounce } from "use-debounce";
import SearchInput from "./SearchInput";
import ResultList from "./ResultList";

const apikey = "63d31e8";

function App() {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [debounceValue] = useDebounce(search, 500);

  // geting results from API
  useEffect(() => {
    if (search.length < 3) return;
    setIsLoading(true);
    fetch(`https://www.omdbapi.com/?apikey=${apikey}&s="${debounceValue}"`)
      .then(res => res.json())
      .then(
        json => {
          if (json.Search instanceof Array) {
            setResult(json.Search);
          } else {
            setResult([]);
          }
        },
        error => {
          setError(error);
        }
      )
      .finally(() => {
        setIsLoading(false);
      });
  }, [debounceValue]);

  if (error) {
    return (
      <div>
        <p>Error: {error.message}</p>
      </div>
    );
  } else {
    return (
      <div className="App">
        <h1 className="welcome-header">Search movies from OMDb API</h1>
        <SearchInput
          placeholderText="Search title..."
          onChangeFun={e => {
            setSearch(e.target.value);
          }}
        />
        {isLoading === true ? (
          <p>Loading...</p>
        ) : (
          <ResultList result={result} debounceValue={debounceValue} />
        )}
      </div>
    );
  }
}

export default App;
