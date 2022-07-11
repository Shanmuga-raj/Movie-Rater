import { useEffect, useState } from "react";
import MovieList from "./components/movie-list/movie-list.component";
import MovieDetails from "./components/movie-details/movie-details.components";
import MovieForm from "./components/movie-form.jsx/movie-form.component";
import API from "./api-service";
import "./App.css";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [editedMovie, setEditedMovie] = useState(null);

  useEffect(() => {
    API.getMovies().then((resp) => setMovies(resp));
  }, []);

  const ClickedMovieDetails = (movie) => {
    setSelectedMovie(movie);
    setEditedMovie(null);
  };

  const editMovie = (movie) => {
    setEditedMovie(movie);
    setSelectedMovie(null);
  };

  const updateList = (movie) => {
    const newMovies = movies.map((mov) => {
      if (mov.id === movie.id) {
        return movie;
      }
      return mov;
    });
    setMovies(newMovies);
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
        {editedMovie ? (
          <MovieForm editedMovie={editedMovie} updateList={updateList} />
        ) : null}
      </div>
    </div>
  );
};

export default App;
