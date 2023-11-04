import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./Routes/Home"
import Cheesecakes from "./Routes/Cheesecakes"
import Burgers from "./Routes/Burgers"
import Restaurants from "./Routes/Restaurants"
import NavBar from "./Routes/NavBar"
import Ranking from "./Routes/Ranking"
import Map from "./Routes/Map";
import "./Styles/global.css";

function App() {
  return (
    <div className="global">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/ranking/:type" element={<Ranking />} />
            <Route path="/map/:type" element={<Map />} />
          </Route>
          <Route path="/cheesecakes" element={<Cheesecakes />} />
          <Route path="/burgers" element={<Burgers />} />
          <Route path="/restaurants" element={<Restaurants />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
