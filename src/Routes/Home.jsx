import { Link, Outlet } from "react-router-dom"

const Home = () => {
  return (
    <>
      <main className="home-container">
        <Link className="links animation-link-1" to="/ranking/cheesecakes"> 🏆 Ranking cheesecakes</Link>
        <Link className="links animation-link-2" to="/ranking/burgers">🏆 Ranking burgers</Link>
        <Link className="links animation-link-3" to="/map/cheesecakes"> 🌍 Map cheesecakes</Link>
        <Link className="links animation-link-4" to="/map/burgers">🌍 Map burgers</Link>
        {/* <Link className="links" to="/ranking/restaurants">🏆 Ranking restaurants</Link> */}
      </main>
      <Outlet />

    </>
  )
}

export default Home