import { useEffect, useState } from "react"
import { getUpcomingMovies } from "../helpers/movieApi"
import { NavLink } from "react-router"

const cinemas = [

    {
        id: 1,
        name: "Viva Cinema",
        distance: "5.2 Kilometers",
        rating: 4.9,
        status: "Closed 10:00 PM",
        logo: "/viva.png"
    },
    {
        id: 2,
        name: "EbonyLife Cinema",
        distance: "6.5 Kilometers",
        rating: 5.1,
        status: "Closed 09.00 PM",
        logo: "/ebonyLife.png"
    },


]

export default function Home() {

    const [movies, setMovies] = useState([])

    useEffect(() => {
        async function loadMovies() {
            const data = await getUpcomingMovies()
            console.log("Upcoming movies API:", data)

            if (data) {
                setMovies(data.results)
            }
        }

        loadMovies()
    }, [])


    return (
        <>
            <header>
                <div className="profile">
                    <div>
                        <span>Welcome Back,</span>
                        <h4>Osysyy</h4>
                    </div>

                    <img src="/ticket-Profile.png" alt="" />
                </div>

                <div className="search-wrapper">
                    <span className="search-icon">
                        <img src="/search-icon.png" alt="" />
                    </span>
                    <input type="search" placeholder="Search your favourite movie" />
                    <div></div>

                </div>
            </header>


            {/* COMING SOON SECTION */}

            <section className="coming-soon">

                <h2>Coming Soon</h2>

                <div className="movie-list">

                    {movies.map(movie => (
                        <NavLink to={`/movie/${movie.id}`} key={movie.id} className="movie-card">
                            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
                            <h3>{movie.title}</h3>
                            <span>{movie.release_date}</span>
                        </NavLink>
                    ))}

                </div>

            </section>


            {/* CINEMA NEAR YOU */}
            <section className="cinema-near">
                <div className="cinema-near__header">
                    <h2>Cinema Near You</h2>
                </div>

                {cinemas.map(cinema => (

                    <div key={cinema.id} className="cinema-card">
                        <img src={cinema.logo} />
                        <div className="cinema-card__info">
                            <div className="cinema-card__distance">
                                <span><img src="/locat.png" alt="" /></span>
                                <p>{cinema.distance}</p>
                            </div>
                            <h4>{cinema.name}</h4>
                            <p className="cinema-card__status">{cinema.status}</p>
                        </div>
                        <div className="cinema-card__rating">
                            <span><img src="/start.png" alt="" /></span>
                            <p>{cinema.rating}</p>
                        </div>
                    </div>
                ))}
            </section>


            <footer className="bottom-nav">
                <NavLink to="/" >
                    <img src="/home-icon.png" alt="" />
                </NavLink>
                <NavLink to="/explore" >
                    <img src="/explore-icon.png" alt="" />
                </NavLink>
                <NavLink to="/" >
                    <img src="/gray-book.png" alt="" />
                </NavLink>
                <NavLink to="/" >
                    <img src="/Profile.png" alt="" />
                </NavLink>

            </footer>
        </>
    )
}