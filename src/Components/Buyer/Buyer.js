import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';     
import { Form, Button, Card, Container, Row, Col, Toast } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import './Buyer.css';
import departureImage from '../assets/img/departure.jpg';
import arrivalImage from '../assets/img/arrival.jpg';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




    const Buyer = () => {
        const navigate = useNavigate();
        const [listings, setListings] = useState([]);
        const [searchParams, setSearchParams] = useState({
            departureCity: '',
            destination: '',
            date: new Date(),
        });
        const [filteredResults, setFilteredResults] = useState([]);
        const [isAuthenticated, setIsAuthenticated] = useState(false);

        //payment stuff here
        const [selectedListing, setSelectedListing] = useState(null);

        useEffect(() => {
            const token = window.localStorage.getItem("token");
            if (!token) {
                alert("You must be logged in to access this page");
                navigate("/login");
            } else {
                setIsAuthenticated(true);
                fetchListings();
            }
        }, [navigate]);

    const fetchListings = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_HOST_URL}/api/listings`);
            setListings(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

        const handleInputChange = (e, field) => {
            setSearchParams({ ...searchParams, [field]: e.target.value });
        };

        const handleDateChange = (date) => {
            setSearchParams({ ...searchParams, date: date });
        };

    const [hasSearched, setHasSearched] = useState(false);
    const handleSearch = () => {
        const results = listings.filter(listing => 
            listing.departureCity.toLowerCase() === searchParams.departureCity.toLowerCase() &&
            listing.destination.toLowerCase() === searchParams.destination.toLowerCase() &&
            new Date(listing.date).toDateString() === searchParams.date.toDateString()
        );
        setFilteredResults(results);
        setHasSearched(true);
    };

        const handleBuyNow = (listing) => {
            console.log(`Buy Now clicked for listing with ID: ${listing._id}`);
            setSelectedListing(listing);
            displayRazorpay(listing.askingPrice, listing);
        };
        
        

        if (!isAuthenticated) {
            return <div>Loading...</div>;
        }

        function loadScript(src) {
            return new Promise((resolve) => {
                const script = document.createElement("script");
                script.src = src;
                script.onload = () => {
                    resolve(true);
                };
                script.onerror = () => {
                    resolve(false);
                };
                document.body.appendChild(script);
            });
        }
        
        async function displayRazorpay(listingPrice, listing) {
            const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        
            if (!res) {
                alert("Razorpay SDK failed to load. Are you online?");
                return;
            }
        
            const result = await axios.post(`${process.env.REACT_APP_BACKEND_HOST_URL}/order`, { amount: listingPrice });
        
            if (!result) {
                alert("Server error. Are you online?");
                return;
            }
        
            const { amount, id: order_id, currency } = result.data;
        
            const options = {
                key: "rzp_test_0hFrUxLaA2mPxN", // Replace with your Razorpay key
                amount: amount.toString(),
                currency: currency,
                name: listing.name, // Name of the product or service being purchased
                description: `Purchase of ${listing.name}`, // Description of the product or service
                
                order_id: order_id,
                handler: async function (response) {
                    const data = {
                        orderCreationId: order_id,
                        razorpayPaymentId: response.razorpay_payment_id,
                        razorpayOrderId: response.razorpay_order_id,
                        razorpaySignature: response.razorpay_signature,
                    };
        
                    const result = await axios.post(`${process.env.REACT_APP_BACKEND_HOST_URL}/order/success`, data);
                    console.log(result);
                    toast.success("🦄 Thanks for the purchase!!", {
                        onClose: () => navigate("/")
                    });
                    
                },
                theme: {
                    color: "#61dafb",
                },
                prefill: {
                    name: "User's Name", // Prefill user's name if available
                    email: "user@example.com", // Prefill user's email if available
                    contact: "1234567890", // Prefill user's phone number if available
                },
                notes: {
                    address: "Razorpay Corporate Office" // Optional: Add a note if required
                },
                modal: {
                    ondismiss: function() {
                        console.log("Transaction cancelled by user.");
                    }
                }
            };
        
            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        }
        
        

    return (
        <Container className="buyer-container">
            <ToastContainer/>
            <h1>Search for Listings</h1>
            <Form className="search-form">
                <Row>
                    <Col>
                        <Form.Group controlId="formDepartureCity">
                            <Form.Label>Departure City</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter departure city" 
                                value={searchParams.departureCity}
                                onChange={(e) => handleInputChange(e, 'departureCity')} 
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formDestination">
                            <Form.Label>Destination</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter destination" 
                                value={searchParams.destination}
                                onChange={(e) => handleInputChange(e, 'destination')} 
                            />
                        </Form.Group>
                    </Col>
                    <Col className="date-picker-col">
                        <Form.Group controlId="formDate">
                            <Form.Label>Date</Form.Label>
                            <DatePicker
                                selected={searchParams.date}
                                onChange={handleDateChange}
                                className="form-control"
                            />
                        </Form.Group>
                        <Button variant="primary" onClick={handleSearch} className="small-search-btn">
                            Search
                        </Button>
                    </Col>
                </Row>
            </Form>
            {hasSearched && (
            <>
            <h2>Listings</h2>
            <Row xs={1} className="g-4">
            {filteredResults.map((listing, idx) => (
    <Col key={idx} className="mb-4">
        <Card className="listing-card">
            <Card.Body>
                <h5 className="listing-title">{listing.name}</h5>

                <Row className="listing-main-info">
                    <Col sm={4} className="dept-listing-city">
                        <img src={departureImage} alt="Departure" className="city-image"/>
                        <p className="city-name">{listing.departureCity}</p>
                    </Col>
                    <Col sm={4} className="dest-listing-city">  
                        <img src={arrivalImage} alt="Arrival" className="city-image"/>
                        <p className="city-name">{listing.destination}</p>
                    </Col>
                    <Col>
                        <p className="flight-num">Flight Number: {listing.flightNum}</p>
                    </Col>
                </Row>

                <Row className="listing-date-time">
                    <Col>{new Date(listing.date).toLocaleDateString()}</Col>
                    <Col>{listing.time}</Col>
                </Row>

                <Row className="listing-space-price">
                    <Col>Space: {listing.availableSpace}</Col>
                    <Col>Price: ${listing.askingPrice}</Col>
                </Row>
            </Card.Body>
            <Card.Footer>
                 <div className="footer-content">
                    <span>Additional Info: {listing.additionalInfo}</span>
                <Button variant="primary" onClick={() => handleBuyNow(listing)}>Buy Now</Button>
                </div>
            </Card.Footer>
        </Card>
    </Col>
                ))}
            </Row>
        </>
            )}
        </Container>
    );
};

export default Buyer;