/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";

export default function useFetch() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  //   const [searchTerm, setSearchTerm] = useState("");

  const API_KEY = "AIzaSyDFPnfsnYiHaoiGvk2ZhTt860VJRDsZRWA";
  const CSE_ID = "1305e5acaa4c44cfc";
  const TYPE = "searchTypeUndefined"; // image

  const getResults = async (query, controller) => {
    const url = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CSE_ID}&q=${query}&num=10&safe=active&searchType=${TYPE}`;

    try {
      setLoading(true);
      const response = await axios.get(url, {
        signal: controller.signal,
      });
      setResults(response.data.items || []);
      //   console.log(response);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  //   useEffect(() => {
  //     const controller = new AbortController();
  //     const debounceTimeout = setTimeout(() => {
  //       getResults(searchTerm, controller);
  //     }, 2000); // Wait 2 second before making the API request

  //     return () => {
  //       clearTimeout(debounceTimeout); // Cancel the timeout if the component unmounts
  //       controller.abort(); // Cancel the request if the component unmounts
  //     }; // Clear the timeout if searchTerm changes before the timeout ends
  //   }, [searchTerm]);

  return [results, loading, getResults];
}
