import { useState, useEffect } from "react";
import axiosInstance from "../utils/axios";

const useFetchData = (url, token = "") => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; 

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        
        let response;
        if (token) {
          response = await axiosInstance.get(url, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        } else {
          response = await axiosInstance.get(url)
        }
     
        if (isMounted) {
          setData(response.data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false; 
    };
  }, [url]);

  return { data, loading, error };
};

export default useFetchData;
