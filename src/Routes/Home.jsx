import { Link, Outlet } from "react-router-dom"

const Home = () => {
  return (
    <>
      <main className="home-container">
        <Link className="links" to="/ranking/cheesecakes"> 🏆 Ranking cheesecakes</Link>
        <Link className="links" to="/ranking/burgers">🏆 Ranking burgers</Link>
        <Link className="links" to="/map/cheesecakes"> 🌍 Map cheesecakes</Link>
        <Link className="links" to="/map/burgers">🌍 Map burgers</Link>
        {/* <Link className="links" to="/ranking/restaurants">🏆 Ranking restaurants</Link> */}
      </main>
      <Outlet />

    </>
  )
}

export default Home