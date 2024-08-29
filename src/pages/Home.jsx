import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("javascript");
  const [results, loading, getResults] = useFetch(); // Ensure correct order: [results, loading, getResults]

  useEffect(() => {
    const controller = new AbortController();
    const debounceTimeout = setTimeout(() => {
      getResults(searchTerm, controller);
    }, 2000); // Wait 2 seconds before making the API request

    return () => {
      clearTimeout(debounceTimeout); // Cancel the timeout if the component unmounts
      controller.abort(); // Cancel the request if the component unmounts
    };
  }, [searchTerm]);

  if (loading) return <h2>Loading...</h2>; // Render a valid JSX element

  return (
    <div>
      {results.length === 0 ? (
        <div>No data found</div> // Render a valid JSX element
      ) : (
        results.map(
          (
            { link, title },
            index // Ensure you're mapping through results correctly
          ) => (
            <div key={index} className="md:w-2/5 w-full">
              <a href={link} target="_blank" rel="noreferrer">
                <p className="text-sm">
                  {link.length > 30 ? link.substring(0, 30) + "..." : link}
                </p>
                <p className="text-lg hover:underline dark:text-blue-300 text-blue-700">
                  {title}
                </p>
              </a>
            </div>
          )
        )
      )}
    </div>
  );
}
