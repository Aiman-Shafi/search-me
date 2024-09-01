import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar({ defaultQuery }) {
  const [searchTerm, setSearchTerm] = useState(defaultQuery || "");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/results?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="mb-4">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
        className="border p-2"
      />
      <button type="submit" className="p-2 ml-2 bg-blue-500 text-white">
        Search
      </button>
    </form>
  );
}
