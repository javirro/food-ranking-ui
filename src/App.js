import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./Routes/Home"
import Cheesecakes from "./Routes/Cheesecakes"
import Burgers from "./Routes/Burgers"
import Restaurants from "./Routes/Restaurants"
import NavBar from "./Routes/NavBar"

function App() {

  return (
    <div>
      <BrowserRouter>
      <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cheesecakes" element={<Cheesecakes />} />
          <Route path="/burgers" element={<Burgers />} />
          <Route path="/restaurants" element={<Restaurants />} />
        </Routes>
      </BrowserRouter>
    </div>

  )
}

export default App;
