import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./movie-list.styles.css";

const MovieList = ({ movies, movieDetails, editedMovie }) => {
  const ClickedMovie = (movie) => {
    movieDetails(movie);
  };

  const editMovie = (movie) => {
    editedMovie(movie);
  };

  return (
    <div>
      {movies.map((movie) => {
        return (
          <div key={movie.id} className="movie-item">
            <h2 onClick={() => ClickedMovie(movie)}>{movie.title}</h2>
            <FontAwesomeIcon icon={faEdit} onClick={() => editMovie(movie)} />
            <FontAwesomeIcon icon={faTrash} />
          </div>
        );
      })}
    </div>
  );
};

export default MovieList;
