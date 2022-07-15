import { useEffect, useState } from "react";
import MovieList from "./components/movie-list/movie-list.component";
import MovieDetails from "./components/movie-details/movie-details.components";
import MovieForm from "./components/movie-form/movie-form.component";
import { useCookies } from "react-cookie";
import API from "./api-service";
import "./App.css";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [editedMovie, setEditedMovie] = useState(null);
  const [token] = useCookies(["auth"]);

  useEffect(() => {
    API.getMovies(token).then((resp) => setMovies(resp));
  }, []);

  useEffect(() => {
    if (!token["auth"]) window.location.href = "/";
  }, [token]);

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

  const newMovie = () => {
    setEditedMovie({ title: "", description: "" });
    setSelectedMovie(null);
  };

  const createNewMovie = (movie) => {
    const newMovies = [...movies, movie];
    setMovies(newMovies);
  };

  const deleteMovie = (movie) => {
    const newMovies = movies.filter((mov) => mov.id !== movie.id);
    setMovies(newMovies);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie rater</h1>
      </header>
      <div className="layout">
        <div>
          <MovieList
            movies={movies}
            movieDetails={ClickedMovieDetails}
            editMovie={editMovie}
            deleteMovie={deleteMovie}
          />
          <button onClick={newMovie}>New Movie</button>
        </div>
        <MovieDetails
          selectedMovie={selectedMovie}
          updateMovie={ClickedMovieDetails}
        />
        {editedMovie ? (
          <MovieForm
            editedMovie={editedMovie}
            updateList={updateList}
            newMovie={createNewMovie}
          />
        ) : null}
      </div>
    </div>
  );
};

export default App;
