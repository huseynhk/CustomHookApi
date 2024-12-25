import { useState, useEffect } from "react";
import axios from "axios";

const useFetchData = (endpoint) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `https://jsonplaceholder.typicode.com/${endpoint}`;
        const response = await axios.get(url);
        if (response.status === 200) {
          setData(response.data);
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, error, loading };
};

export default useFetchData;

