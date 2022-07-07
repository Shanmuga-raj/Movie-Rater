import React from "react";

const MovieForm = ({ editedMovie }) => {
  return <h1>{editedMovie && editedMovie.title} edit</h1>;
};
export default MovieForm;
