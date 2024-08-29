import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Search from "../pages/Search";

export default function AppRouter() {
  return (
    <div>
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          {/* <Route path="/images" element={<Images />} /> */}
          {/* <Route path="/search" element={<Home />} /> */}
        </Routes>
      </div>
    </div>
  );
}
