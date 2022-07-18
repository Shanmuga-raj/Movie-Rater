import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import API from "../api-service";

function useFetch() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [token] = useCookies(["auth"]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError();
      const data = await API.getMovies(token).catch((error) => setError(error));
      setData(data);
      setLoading(false);
    }
    fetchData();
  }, [token]);
  return [data, loading, error];
}

export { useFetch };
