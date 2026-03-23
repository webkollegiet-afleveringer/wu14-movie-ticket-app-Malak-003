import { useState, useEffect } from "react"
import { NavLink, useParams } from "react-router"

export default function Checkout() {
    const { id } = useParams()
    const [showSuccess, setShowSuccess] = useState(false)


    const [errors, setErrors] = useState({})
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [cardNumber, setCardNumber] = useState("")
    const [expDate, setExpDate] = useState("")
    const [cvv, setCvv] = useState("")


    useEffect(() => {
        setEmail(localStorage.getItem("email") || "")
        setName(localStorage.getItem("name") || "")
        setCardNumber(localStorage.getItem("cardNumber") || "")
        setExpDate(localStorage.getItem("expDate") || "")
        setCvv(localStorage.getItem("cvv") || "")
    }, [])


    function validate() {
        const newErrors = {}

        if (!email) {
            newErrors.email = "Email is required"
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "Enter a valid email"
        }

        if (!name) {
            newErrors.name = "Name is required"
        } else if (name.length < 3) {
            newErrors.name = "Name must be at least 3 characters"
        }

        if (!cardNumber) {
            newErrors.cardNumber = "Card number is required"
        } else if (cardNumber.length < 16) {
            newErrors.cardNumber = "Card number must be 16 digits"
        }

        if (!expDate) {
            newErrors.expDate = "Date is required"
        }

        if (!cvv) {
            newErrors.cvv = "CVV is required"
        } else if (cvv.length < 3) {
            newErrors.cvv = "CVV must be 3 digits"
        }


        setErrors(newErrors)

        // if no errors return true, otherwise false
        return Object.keys(newErrors).length === 0
    }


    function handlePayment() {
        if (validate()) {
            setShowSuccess(true)
        }
    }


    return (
        <div className="checkout">

            <header className="checkout-header">
                <NavLink to={`/movie/${id}/seats`}><img src="/back.png" alt="" /></NavLink>
                <h2>Checkout</h2>
                <div></div>

            </header>

            <div className="payment-method">
                <div className="payment-method__top">
                    <h2>Payment Method</h2>
                    <span>Change</span>
                </div>

                <div className="bank-card">
                    <div className="bank-card__top">
                        <img src="/mastercard.png" alt="" />

                        <div>
                            <p className="balance-label">Balance</p>
                            <p className="balance-amount">$120,580,00</p>
                        </div>
                    </div>
                    <div className="bank-card__bottom">
                        <div>
                            <p className="card-label">Card Holder</p>
                            <p className="card-holder">Miles Morales</p>
                        </div>
                        <p className="card-number">**** **** **** 51446</p>
                    </div>
                </div>


                <div className="payment-details">
                    <h2>Payment Details</h2>

                    <div className="form-field">
                        <label>Your Email</label>
                        <input type="email" value={email}
                            onChange={event => {
                                setEmail(event.target.value)
                                localStorage.setItem("email", event.target.value)
                            }}
                        />
                        {errors.email && <p className="error">{errors.email}</p>}
                    </div>

                    <div className="form-field">
                        <label>Cardholder Name</label>
                        <input type="text" value={name}
                            onChange={event => {
                                setName(event.target.value)
                                localStorage.setItem("name", event.target.value)
                            }}
                        />
                        {errors.name && <p className="error">{errors.name}</p>}
                    </div>

                    <div className="form-field">
                        <label>Card Number</label>
                        <input type="text" value={cardNumber}
                            onChange={event => {
                                setCardNumber(event.target.value)
                                localStorage.setItem("cardNumber", event.target.value)
                            }} />
                        {errors.cardNumber && <p className="error">{errors.cardNumber}</p>}
                    </div>

                    {/* DATE AND CVV SIDE BY SIDE */}
                    <div className="form-row">
                        <div className="form-field">
                            <label>Date</label>
                            <input type="text" value={expDate}
                                onChange={event => {
                                    setExpDate(event.target.value)
                                    localStorage.setItem("expDate", event.target.value)
                                }}
                            />
                            {errors.expDate && <p className="error">{errors.expDate}</p>}
                        </div>
                        <div className="form-field">
                            <label>CVV</label>
                            <input type="text" value={cvv}
                                onChange={event => {
                                    setCvv(event.target.value)
                                    localStorage.setItem("cvv", event.target.value)
                                }}
                            />
                            {errors.cvv && <p className="error">{errors.cvv}</p>}
                        </div>
                    </div>
                </div>


            </div>

            <button className="pay-btn" onClick={handlePayment}>
                <span>Pay Now </span>
                <span>|</span>
                <span className="pay-price">$99.8</span>
            </button>

            {showSuccess && (
                <div className="success-overlay">
                    <div className="success-popup">

                        <div className="success-icon"><img src="/Icon-Success.png" alt="" /></div>

                        <h3>Your payment was successful</h3>
                        <p>Adele is a Scottish heiress whose extremely
                            wealthy family owns estates and grounds.
                            When she was a teenager. Read More</p>


                        <NavLink to={`/movie/${id}/eticket`} className="success-btn">
                            See E-Ticket
                        </NavLink>

                    </div>
                </div>
            )}


        </div>
    )
}