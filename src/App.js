import { useEffect, useState } from "react";
import MovieList from "./components/movie-list/movie-list.component";
import MovieDetails from "./components/movie-details/movie-details.components";
import MovieForm from "./components/movie-form.jsx/movie-form.component";
import "./App.css";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [editedMovie, setEditedMovie] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}/movies/`, {
      method: "GET",
      // headers: {
      //   "Content-Type": "application/json",
      //   Authorization: process.env.Authorization,
      // },
    })
      .then((resp) => resp.json())
      .then((resp) => setMovies(resp))
      .catch((error) => console.log(error));
  }, []);

  const ClickedMovieDetails = (movie) => {
    setSelectedMovie(movie);
    setEditedMovie(null);
  };

  // const loadMovie = (movie) => {
  //   setSelectedMovie(movie);
  //   setEditedMovie(null);
  // };

  const editMovie = (movie) => {
    setEditedMovie(movie);
    setSelectedMovie(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie rater</h1>
      </header>
      <div className="layout">
        <MovieList
          movies={movies}
          movieDetails={ClickedMovieDetails}
          editedMovie={editMovie}
        />
        <MovieDetails
          selectedMovie={selectedMovie}
          updateMovie={ClickedMovieDetails}
        />
        <MovieForm editedMovie={editedMovie} />
      </div>
    </div>
  );
};

export default App;
