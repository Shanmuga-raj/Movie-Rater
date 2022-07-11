const URL = process.env.REACT_APP_URL;
const TOKEN = process.env.REACT_APP_AUTHORIZATION;

export default class API {
  static getMovies() {
    return fetch(`${URL}/movies/`, {
      method: "GET",
    }).then((resp) => resp.json());
  }

  static getMovieDetails(id) {
    return fetch(`${URL}/movies/${id}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: TOKEN,
      },
    }).then((resp) => resp.json());
  }

  static createMovie(body) {
    return fetch(`${URL}/movies/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: TOKEN,
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static updateMovie(id, body) {
    return fetch(`${URL}/movies/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: TOKEN,
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static rateMovie(id, body) {
    return fetch(`${URL}/movies/${id}/rate_movie/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: TOKEN,
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static deleteMovie(id) {
    return fetch(`${URL}/movies/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: TOKEN,
      },
    })
  }
}
