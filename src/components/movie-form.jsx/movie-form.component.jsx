import React from "react";

const MovieForm = ({ editedMovie }) => {
  return (
    <React.Fragment>
      {editedMovie ? <h1>{editedMovie.title} edit</h1> : null}
    </React.Fragment>
  );
};
export default MovieForm;
