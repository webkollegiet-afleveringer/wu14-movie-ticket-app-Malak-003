import { useState } from "react"
import { NavLink, useNavigate, useParams } from "react-router"

const cinemas = ["Empire XXI Yogyakarta", "Viva Cinema", "EbonyLife Cinema"]
const dates = ["19 Mars 2026", "20 Mars 2026", "21 Mars 2026"]
const times = ["03.00 PM", "07.00 PM", "11.00 PM"]

// 0 available, 1 reserved 
const seatLayout = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0]
]

export default function Seats() {
    const { id } = useParams()
    const navigate = useNavigate()


    const [pickedSeats, setPickedSeats] = useState([])

    const [cinema, setCinema] = useState(cinemas[0])
    const [date, setDate] = useState(dates[0])
    const [time, setTime] = useState(times[0])


    function handleSeatClick(rowIndex, colIndex) {
        const seatKey = `${rowIndex}-${colIndex}`

        if (pickedSeats.includes(seatKey)) {
            // if already selected remove it
            setPickedSeats(pickedSeats.filter(seat => seat !== seatKey))
        } else {
            // if not selected add it
            setPickedSeats([...pickedSeats, seatKey])
        }
    }


    function handleCheckout() {
        // save everything to localStorage before going to checkout
        localStorage.setItem("pickedSeats", JSON.stringify(pickedSeats))
        localStorage.setItem("cinema", cinema)
        localStorage.setItem("date", date)
        localStorage.setItem("time", time)
        navigate(`/movie/${id}/checkout`)
    }

    return (
        <div className="seats">

            <header className="seats-header">
                <NavLink to={`/movie/${id}`}>
                    <img src="/back.png" alt="" />
                </NavLink>
                <h2>Select Seats</h2>
                <img src="/Bookmark.png" alt="" />
            </header>


            <div className="seats-field">
                <label>Cinema</label>
                <div className="seats-select">
                    <select value={cinema} onChange={event => setCinema(event.target.value)}>
                        {cinemas.map(cinema => (
                            <option key={cinema}>{cinema}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="DT-row">
                <div className="seats-field">
                    <label>Date</label>
                    <div className="seats-select">
                        <select value={date} onChange={event => setDate(event.target.value)}>
                            {dates.map(date => (
                                <option key={date}>{date}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="seats-field">
                    <label>Time</label>
                    <div className="seats-select">
                        <select value={time} onChange={event => setTime(event.target.value)}>
                            {times.map(time => (
                                <option key={time}>{time}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>



            <div className="seat-grid">
                {/* row loop */}
                {seatLayout.map((row, rowIndex) => (

                    <div key={rowIndex} className="seat-row">
                        {/* loop through each seat in the row */}
                        {row.map((seat, colIndex) => {

                            const seatKey = `${rowIndex}-${colIndex}`

                            // decide seat type
                            let status = "available"
                            if (seat === 1) status = "reserved"
                            if (pickedSeats.includes(seatKey)) status = "selected"

                            return (
                                <div key={colIndex} className={`seat ${status}`}
                                    onClick={() =>
                                        status !== "reserved" &&
                                        handleSeatClick(rowIndex, colIndex)
                                    }
                                />
                            )
                        })}
                    </div>
                ))}
            </div>

            <div className="seat-dots">
                <span><div className="dot selected"></div> Selected</span>
                <span><div className="dot reserved"></div> Reserved</span>
                <span><div className="dot available"></div> Available</span>
            </div>

            <button className="book-btn" onClick={handleCheckout}>
                Checkout
            </button>


        </div>
    )
}