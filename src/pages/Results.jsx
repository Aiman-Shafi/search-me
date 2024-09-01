import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import SearchBar from "./Search";

export default function ResultPage() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");
  const [results, loading, getResults] = useFetch();
  const [isLoadingMore, setIsLoadingMore] = useState(false); // Loading state for "Load More"
  const [startIndex, setStartIndex] = useState(1); // For pagination
  const loadMoreRef = useRef(null); // Create a ref

  useEffect(() => {
    const controller = new AbortController();
    if (query) {
      getResults(query, controller, startIndex);
    }

    return () => {
      controller.abort();
    };
  }, [query, startIndex]);

  const loadMoreResults = () => {
    setIsLoadingMore(true); // Set loading state for "Load More"
    setStartIndex((prevIndex) => prevIndex + 10); // Increment startIndex to load the next set of results
  };

  useEffect(() => {
    if (!loading && loadMoreRef.current) {
      loadMoreRef.current.scrollIntoView({ behavior: "smooth" });
      setIsLoadingMore(false); // Scroll to the ref when new results are loaded
    }
  }, [loading]);

  if (!query) {
    return (
      <div>
        <SearchBar />
        <p>Please enter a search term to see results.</p>
      </div>
    );
  }

  if (loading && startIndex === 1) return <h2>Loading...</h2>; // Show initial loading only on first load

  return (
    <div>
      <SearchBar defaultQuery={query} />
      {results.length === 0 ? (
        <div>No data found</div>
      ) : (
        <div className="results">
          {results.map(({ link, title }, index) => (
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
          ))}
          <div ref={loadMoreRef}></div> {/* Ref at the bottom of the results */}
          {isLoadingMore ? (
            <div className="my-4 text-center">
              <div className="spinner"></div> {/* Spinner */}
              <p>Loading more...</p>
            </div>
          ) : (
            <button
              onClick={loadMoreResults}
              className="mt-4 p-2 bg-blue-500 text-white"
            >
              Load More
            </button>
          )}
        </div>
      )}
    </div>
  );
}
