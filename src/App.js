import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { useFetch } from "./hooks/useFetch";
import MovieList from "./components/movie-list/movie-list.component";
import MovieDetails from "./components/movie-details/movie-details.components";
import MovieForm from "./components/movie-form/movie-form.component";
import { useCookies } from "react-cookie";
import "./App.css";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [editedMovie, setEditedMovie] = useState(null);
  /* eslint-disable no-unused-vars */
  const [token, setToken, removeToken] = useCookies(["auth"]);
  /* eslint-enable no-unused-vars */
  const [data, loading, error] = useFetch();

  useEffect(() => {
    setMovies(data);
  }, [data]);

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

  const logoutUser = () => {
    removeToken(["auth"]);
  };

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error Loading movies</h1>;
  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie rater</h1>
        <FontAwesomeIcon icon={faSignOutAlt} onClick={logoutUser} />
      </header>
      <div className="layout">
        <div>
          <MovieList
            movies={movies}
            movieDetails={ClickedMovieDetails}
            editMovie={editMovie}
            deleteMovie={deleteMovie}
          />
          <button className="form-button" onClick={newMovie}>
            New Movie
          </button>
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
