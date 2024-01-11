import { Outlet } from "react-router-dom";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <main>
      <NavBar />
      <Outlet />
      <Footer />
    </main>
  );
}

export default App;
