import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import "./movie-details.styles.css";

const MovieDetails = ({ selectedMovie, updateMovie }) => {
  const [highlighted, setHighlighted] = useState(-1);

  const highLightRate = (highlight) => {
    setHighlighted(highlight);
  };

  const rateClicked = (rating) => {
    fetch(
      `${process.env.REACT_APP_URL}/movies/${selectedMovie.id}/rate_movie/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: process.env.REACT_APP_AUTHORIZATION,
        },
        body: JSON.stringify({ stars: rating + 1 }),
      }
    )
      .then((resp) => resp.json())
      .then(() => getDetails())
      .catch((error) => console.log(error));
  };

  const getDetails = () => {
    fetch(`${process.env.REACT_APP_URL}/movies/${selectedMovie.id}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token b59b6ffa5f32066976775c45f9dc623f8a403837",
      },
    })
      .then((resp) => resp.json())
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
