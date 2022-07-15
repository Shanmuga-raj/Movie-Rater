const URL = process.env.REACT_APP_URL;
const LOGIN_URL = process.env.REACT_APP_LOGIN_URL;

export default class API {
  static getMovies(token) {
    return fetch(`${URL}/movies/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token["auth"]}`,
      },
    }).then((resp) => resp.json());
  }

  static getMovieDetails(id, token) {
    return fetch(`${URL}/movies/${id}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token["auth"]}`,
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

  static register(body) {
    return fetch(`${LOGIN_URL}/api/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }
}
