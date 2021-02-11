import React from "react";

export default function ResultList({ result, debounceValue }) {
  return (
    <div>
      {result.length === 0 && debounceValue.length !== 0 ? (
        
        <p>{`No movies found with the title: ${debounceValue}`}</p>
      ) : (
        <ul>
          {result.map(movie => (
            <li key={movie.imdbID}>
              {movie.Title} ({movie.Year})
              <br />
              {movie.Poster !== "N/A" ? (
                <img className="poster" src={movie.Poster} alt={`poster for ${movie.Title}`} />
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
