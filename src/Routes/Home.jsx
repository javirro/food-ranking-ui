import { Link } from "react-router-dom"

const Home = () => {
  return (
    <main className="home-container">
      <Link className="links" to="/ranking/cheesecakes">Ranking cheesecakes</Link>
      <Link className="links" to="/ranking/burgers">Ranking burgers</Link>
      <Link className="links" to="/ranking/restaurants">Ranking restaurants</Link>
    </main>
  )
}

export default Home