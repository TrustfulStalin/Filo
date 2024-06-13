import "./App.css";

// IMPORT COMPONENTS
import Header from "./Components/header";
import Footer from "./Components/footer";
import { Route, Routes } from "react-router-dom";
// IMPORT PAGES
import Home from "./Pages/Home";
import About from "./Pages/About";
import Projects from "./Pages/projects";

function App() {
  // URL should have YOUR HEROKU URL for your backend, make sure you include the trailing slash
  const URL = "http://localhost:4000/";

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/projects" element={<Projects URL={URL}/>}/>
        <Route exact path="/about" element={<About URL={URL}/>}/>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;