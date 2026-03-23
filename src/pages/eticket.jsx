import { useState } from "react"
import { NavLink } from "react-router"

export default function Eticket() {
    const [showDownload, setShowDownload] = useState(false)

    // read all saved info from localStorage
    const movieTitle = localStorage.getItem("movieTitle")
    const cinema = localStorage.getItem("cinema")
    const date = localStorage.getItem("date")
    const time = localStorage.getItem("time")
    const pickedSeats = JSON.parse(localStorage.getItem("pickedSeats")) || []

    return (
        <div className="ticket-page">

            <header className="ticket-header">
                <NavLink to="/"><img src="/back.png" alt="" /></NavLink>
                <h2>E-Ticket</h2>
                <div></div>
            </header>

            <h3>Instruction</h3>
            <p className="ticket-instruction">
                Come to the cinema, show and scan the barcode to the space provided. Continue to comply with health protocols.            </p>

            <div className="ticket-card">

                <div className="ticket-card__top">
                    <p className="ticket-film">Film: {movieTitle}</p>
                    <span className="ticket-label">e-ticket</span>
                </div>

                <div className="ticket-info-row">
                    <div>
                        <p className="info-label">Date</p>
                        <p className="info-value">{date}</p>
                    </div>
                    <div>
                        <p className="info-label">Seats</p>
                        <p className="info-value">{pickedSeats.join(", ")}</p>
                    </div>
                </div>

                <div className="ticket-info-row">
                    <div>
                        <p className="info-label">Location</p>
                        <p className="info-value">{cinema}</p>
                    </div>
                    <div>
                        <p className="info-label">Time</p>
                        <p className="info-value">{time}</p>
                    </div>
                </div>

                <div className="ticket-info-row">
                    <div>
                        <p className="info-label">Payment</p>
                        <p className="info-value">Successful</p>
                    </div>
                    <div>
                        <p className="info-label">Order</p>
                        <p className="info-value">1904566</p>
                    </div>
                </div>

            </div>

            <button className="book-btn" onClick={() => setShowDownload(true)}>
                Download E-Ticket
            </button>

            {showDownload && (
                <div className="download-overlay">
                    <div className="download-popup">
                        <div className="download-icon"><img src="/icon-downloaded.png" alt="" /></div>
                        <h3>Your ticket has been downloaded</h3>
                        <p>Adele is a Scottish heiress whose extremely
                            wealthy family owns estates and grounds.
                            When she was a teenager. Read More</p>
                        <NavLink to="/" className="download-btn">Back To Home</NavLink>
                    </div>
                </div>
            )}

        </div>
    )
}