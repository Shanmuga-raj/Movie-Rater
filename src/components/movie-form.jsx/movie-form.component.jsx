import React, { useEffect, useState } from "react";
import API from "../../api-service";

const MovieForm = ({ editedMovie, updateList }) => {
  const { id, title, description } = editedMovie;

  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  useEffect(() => {
    setNewTitle(title);
    setNewDescription(description);
  }, [title, description]);

  const UpdateData = () => {
    API.updateMovie(id, { title: newTitle, description: newDescription }).then(
      (resp) => updateList(resp)
    );
  };

  return (
    <React.Fragment>
      {editedMovie ? (
        <div>
          <label htmlFor="title">Title</label>
          <br />
          <input
            id="title"
            type="text"
            placeholder="Title"
            value={newTitle}
            onChange={(event) => setNewTitle(event.target.value)}
          />
          <br />
          <label htmlFor="description">Description</label>
          <br />
          <textarea
            id="description"
            type="text"
            placeholder="Description"
            value={newDescription}
            onChange={(event) => setNewDescription(event.target.value)}
          ></textarea>
          <br />
          <button onClick={UpdateData}>Update</button>
        </div>
      ) : null}
    </React.Fragment>
  );
};
export default MovieForm;
