import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import API from "../../api-service";
import "./movie-list.styles.css";

const MovieList = ({ movies, movieDetails, editMovie, deleteMovie }) => {
  const ClickedMovie = (movie) => {
    movieDetails(movie);
  };

  const editClicked = (movie) => {
    editMovie(movie);
  };

  const removeClicked = (movie) => {
    API.deleteMovie(movie.id)
      .then(() => deleteMovie(movie))
      .catch((error) => console.log(error));
  };

  return (
    <div>
      {movies.map((movie) => {
        return (
          <div key={movie.id} className="movie-item">
            <h2 onClick={() => ClickedMovie(movie)}>{movie.title}</h2>
            <FontAwesomeIcon icon={faEdit} onClick={() => editClicked(movie)} />
            <FontAwesomeIcon
              icon={faTrash}
              onClick={() => removeClicked(movie)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default MovieList;
