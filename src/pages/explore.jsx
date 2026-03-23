import { useEffect, useState } from "react"
import { nowPlayingMovies, getUpcomingMovies } from "../helpers/movieApi"
import { NavLink, Link } from "react-router"

// genre IDs from the API into readable names
const genres = {
    28: "Action", 12: "Adventure", 16: "Animation", 35: "Comedy",
    80: "Crime", 18: "Drama", 14: "Fantasy", 27: "Horror",
    9648: "Mystery", 10749: "Romance", 878: "Sci-Fi", 53: "Thriller",
    10752: "War", 37: "Western", 10751: "Family", 36: "History"
}

export default function Explore() {

    const [nowPlaying, setNowPlaying] = useState([])
    const [upcoming, setUpcoming] = useState([])

    const [topMovies, setTopMovies] = useState([])
    const [upcomingTop, setUpcomingTop] = useState([])

    const [tab, setTab] = useState("now")

    useEffect(() => {
        async function loadMovies() {
            // fetch playing and upcoming movies
            const rec = await nowPlayingMovies()
            console.log("nowPLaying movies API:", rec)
            const up = await getUpcomingMovies()
            console.log("Upcoming movies API:", up)


            if (rec) {
                // sort "now playing" by vote_average (highest first)
                const sorted = [...rec.results].sort((a, b) => b.vote_average - a.vote_average)
                setTopMovies(sorted.slice(0, 7))
                setNowPlaying(rec.results.slice(0, 7))
            }

            if (up) {
                // sort "upcoming" 
                const sortedUp = [...up.results].sort((a, b) => b.vote_average - a.vote_average)
                setUpcomingTop(sortedUp.slice(0, 7))
                setUpcoming(up.results.slice(0, 7))
            }
        }
        loadMovies()
    }, [])

    // switch top movies based on active tab
    const displayedTop = tab === "now" ? topMovies : upcomingTop

    // switch recommended movies
    const displayedRecommended = tab === "now" ? nowPlaying : upcoming

    return (
        <>
            <header className="explore-header">
                <NavLink to="/" className="back-btn"><img src="/back.png" alt="" /></NavLink>
                <h2>Explore Movie</h2>
                <img src="/explore-search.png" alt="" />
            </header>

            {/* TABS - switch between Now Showing and Upcoming */}
            <div className="tabs">
                <button
                    className={tab === "now" ? "tab active" : "tab"}
                    onClick={() => setTab("now")}
                >
                    Now Showing
                </button>
                <button
                    className={tab === "upcoming" ? "tab active" : "tab"}
                    onClick={() => setTab("upcoming")}
                >
                    Upcoming
                </button>
            </div>

            <section className="top-movies">
                <div className="section-header">
                    <h2>Top Movies</h2>
                </div>

                <div className="top-movies-grid">
                    {displayedTop.map(movie => (
                        <Link to={`/movie/${movie.id}`} key={movie.id} className="top-movie-card">
                            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
                            <h4>{movie.title}</h4>

                            {/* STAR RATING - vote_average is out of 10, divide by 2 to get out of 5 */}
                            <div className="stars">
                                {[1, 2, 3, 4, 5].map(index => (
                                    // color the star gold if its number is less than or equal to the rating
                                    <span key={index} style={{ color: index <= Math.round(movie.vote_average / 2) ? "#f4a012" : "#444" }}>★</span>
                                ))}
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            <section className="recommended">
                <div className="section-header">
                    <h2>Recommended</h2>
                </div>
                <div className="recommended-grid">
                    {displayedRecommended.map(movie => (
                        <Link to={`/movie/${movie.id}`} key={movie.id} className="recommended-card">
                            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
                            <h4>{movie.title}</h4>

                            <div className="recommended-card__genre">
                                {movie.genre_ids.slice(0, 1).map(id => (
                                    <span key={id} className="genre-tag">{genres[id]}</span>
                                ))}
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            <footer className="bottom-nav">
                <NavLink to="/" >
                    <img src="/home-icon.png" alt="" />
                </NavLink>
                <NavLink to="/explore">
                    <img src="/explore-icon.png" alt="" />
                </NavLink>
                <NavLink to="/explore" >
                    <img src="/gray-book.png" alt="" />
                </NavLink>
                <NavLink to="/explore" >
                    <img src="/Profile.png" alt="" />
                </NavLink>
            </footer>
        </>
    )
}