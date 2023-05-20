import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./Routes/Home"
import NavBar from "./Routes/NavBar"
function App() {

  return (
    <div>
      <BrowserRouter>
      <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>

  )
}

export default App;
