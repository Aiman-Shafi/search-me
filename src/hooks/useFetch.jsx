import axios from "axios";
import { useState } from "react";

export default function useFetch() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_KEY = "AIzaSyDFPnfsnYiHaoiGvk2ZhTt860VJRDsZRWA";
  const CSE_ID = "1305e5acaa4c44cfc";

  const getResults = async (query, controller, startIndex = 1) => {
    const url = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CSE_ID}&q=${query}&num=10&safe=active&start=${startIndex}`;

    try {
      setLoading(true);
      const response = await axios.get(url, {
        signal: controller.signal,
      });

      if (startIndex === 1) {
        setResults(response.data.items || []);
      } else {
        setResults((prevResults) => [
          ...prevResults,
          ...(response.data.items || []),
        ]);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return [results, loading, getResults];
}
