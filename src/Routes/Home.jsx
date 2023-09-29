import { Link, Outlet } from "react-router-dom"
import Map from "../Components/Map"
const Home = () => {

  return (
    <>
      <main className="home-container">
        <Link className="links" to="/ranking/cheesecakes"> 🏆 Ranking cheesecakes</Link>
        <Link className="links" to="/ranking/burgers">🏆 Ranking burgers</Link>
        <Link className="links" to="/ranking/restaurants">🏆 Ranking restaurants</Link>
      </main>
      <div>
        <Map />
      </div>
      <Outlet />

    </>
  )
}

export default Home