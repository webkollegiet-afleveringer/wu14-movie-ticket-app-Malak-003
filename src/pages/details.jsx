import { useEffect, useState } from "react";
import { useParams, NavLink, useNavigate } from "react-router";
import { movieDetails } from "../helpers/movieApi"


export default function Details() {

    const { id } = useParams()
    const [movie, setMovie] = useState(null)
    const [showFull, setShowFull] = useState(false)

    const navigate = useNavigate()



    useEffect(() => {
        async function loadMovie() {
            const data = await movieDetails(id)
            console.log(" moviesDetails API:", data)

            if (data) {
                setMovie(data)
            }
        }
        loadMovie()

    }, [id])

    if (!movie) return <p>Loading</p>

        function handleBookTicket() {
        localStorage.setItem("movieTitle", movie.title)
        navigate(`/movie/${id}/seats`)
    }

    return (
        <div className="details">
            <header className="details-header">
                <NavLink to="/explore" ><img src="/back.png" alt="" /></NavLink>
                <h2>Details Movie</h2>
                <img src="/Bookmark.png" alt="" />
            </header>


            <img className="details-poster" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />

            <div className="details-info">
                <h2>{movie.title}</h2>
                <span className="details-info__rating"><img src="/start.png" />{movie.vote_average.toFixed(1)}</span>
                <div className="details-tags">
                    {movie.genres.slice(0, 2).map(genre => (
                        <span key={genre.id} className="tag">{genre.name}</span>
                    ))}
                    <span className="tag">{Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m</span>

                </div>

                <h2>Synopsis</h2>

                <p className="synopsis">
                    {/* if showFull is true show full text, else show only first 120 characters */}
                    {showFull ? movie.overview : movie.overview.slice(0, 105) + "..."}

                    {/* clicking this toggles showFull between true and false */}
                    <span className="read-more" onClick={() => setShowFull(!showFull)}>
                        {showFull ? " Show Less" : " Read More"}
                    </span>
                </p>
                
                <button className="book-btn" onClick={handleBookTicket}>
                    Book Ticket
                </button>

            </div>
        </div>

    )
}
