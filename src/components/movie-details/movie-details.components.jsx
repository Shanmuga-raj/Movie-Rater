import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useCookies } from "react-cookie";
import API from "../../api-service";
import "./movie-details.styles.css";

const MovieDetails = ({ selectedMovie, updateMovie }) => {
  const [highlighted, setHighlighted] = useState(-1);
  const [token] = useCookies(["auth"]);

  const highLightRate = (highlight) => {
    setHighlighted(highlight);
  };

  const rateClicked = (rating) => {
    API.rateMovie(selectedMovie.id, { stars: rating + 1 }, token)
      .then(() => getDetails())
      .catch((error) => console.log(error));
  };

  const getDetails = () => {
    API.getMovieDetails(selectedMovie.id, token)
      .then((resp) => updateMovie(resp))
      .catch((error) => console.log(error));
  };

  return (
    <React.Fragment>
      {selectedMovie ? (
        <div>
          <h1>{selectedMovie.title}</h1>
          <p>{selectedMovie.description}</p>
          <FontAwesomeIcon
            icon={faStar}
            className={selectedMovie.avg_rating > 0 ? "orange" : ""}
          />
          <FontAwesomeIcon
            icon={faStar}
            className={selectedMovie.avg_rating > 1 ? "orange" : ""}
          />
          <FontAwesomeIcon
            icon={faStar}
            className={selectedMovie.avg_rating > 2 ? "orange" : ""}
          />
          <FontAwesomeIcon
            icon={faStar}
            className={selectedMovie.avg_rating > 3 ? "orange" : ""}
          />
          <FontAwesomeIcon
            icon={faStar}
            className={selectedMovie.avg_rating > 4 ? "orange" : ""}
          />
          <span className="no_of_ratings">({selectedMovie.no_of_ratings})</span>
          <div className="rating-container">
            <h2>Rate it</h2>
            {[...Array(5)].map((e, i) => {
              return (
                <FontAwesomeIcon
                  key={i}
                  icon={faStar}
                  className={highlighted > i - 1 ? "purple" : ""}
                  onMouseEnter={() => highLightRate(i)}
                  onMouseLeave={() => highLightRate(-1)}
                  onClick={() => rateClicked(i)}
                />
              );
            })}
          </div>
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default MovieDetails;
