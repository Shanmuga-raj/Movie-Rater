const URL = process.env.REACT_APP_URL;
const LOGIN_URL = process.env.REACT_APP_LOGIN_URL;
// const TOKEN = process.env.REACT_APP_AUTHORIZATION;

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
      },
    }).then((resp) => resp.json());
  }

  static createMovie(body, token) {
    return fetch(`${URL}/movies/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token["auth"]}`,
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static updateMovie(id, body, token) {
    return fetch(`${URL}/movies/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token["auth"]}`,
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static rateMovie(id, body, token) {
    return fetch(`${URL}/movies/${id}/rate_movie/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token["auth"]}`,
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static deleteMovie(id, token) {
    return fetch(`${URL}/movies/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token["auth"]}`,
      },
    });
  }

  static login(body) {
    return fetch(`${LOGIN_URL}/auth/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }
}
