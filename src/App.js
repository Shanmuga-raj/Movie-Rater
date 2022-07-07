import { useEffect, useState } from "react";
import "./App.css";
import MovieList from "./components/movie-list/movie-list.component";
import MovieDetails from "./components/movie-details/movie-details.components";
import MovieForm from "./components/movie-form.jsx/movie-form.component";

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
  };

  const loadMovie = (movie) => {
    setSelectedMovie(movie);
  };

  const editMovie = (movie) => {
    setEditedMovie(movie);
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
        <MovieDetails selectedMovie={selectedMovie} updateMovie={loadMovie} />
        <MovieForm editedMovie={editedMovie} />
      </div>
    </div>
  );
};

export default App;
