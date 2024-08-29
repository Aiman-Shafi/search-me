import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Routes from "./components/Routes";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <>
      <main data-theme={darkMode ? "dark" : "light"}>
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        <Routes />
        <Footer />
      </main>
    </>
  );
}
