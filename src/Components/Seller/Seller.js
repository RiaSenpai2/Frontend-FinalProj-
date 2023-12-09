// import React, { useState, useEffect } from "react";
// import { useNavigate } from 'react-router-dom'; // Updated to use useNavigate
// import { Button, Form, Modal } from 'react-bootstrap';
// import './Seller.css';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import axios from 'axios';

// const Seller = () => {
//     const navigate = useNavigate(); // Updated to useNavigate
//     const initialFormData = {
//         name: '',
//         email: '',
//         departureCity: '',
//         destination: '',
//         flightNum: '',
//         date: new Date(),
//         time: '',
//         availableSpace: '',
//         FlightCarrier: '',
//         AskingPrice: '',
//         additionalInfo: ''
//     };

//     const [formData, setFormData] = useState(initialFormData);
//     const [errors, setErrors] = useState({});
//     const [showModal, setShowModal] = useState(false);
//     const [isAuthenticated, setIsAuthenticated] = useState(false);

//     useEffect(() => {
//         const token = window.localStorage.getItem("token");
//         if (!token) {
//             alert("You must be logged in to post a listing");
//             navigate("/login"); // Updated to use navigate
//         } else {
//             setIsAuthenticated(true);
//         }
//     }, [navigate]); // navigate added to the dependency array

//     const handleInputChange = (e, field) => {
//         setFormData({ ...formData, [field]: e.target.value });
//     };

//     const handleDateChange = (date) => {
//         setFormData({ ...formData, date: date });
//     };

//     const validateForm = () => {
//         let tempErrors = {};
//         if (!formData.name) tempErrors.name = "Name is required";
//         if (!formData.email) tempErrors.email = "Email is required";
//         // Add more validation as needed
//         setErrors(tempErrors);
//         return Object.keys(tempErrors).length === 0;
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (validateForm()) {
//             try {
//                 const response = await axios.post('https://backend-luggshare3.onrender.com/api/listings', formData);
//                 console.log(response.data);
//                 setFormData(initialFormData);
//                 setShowModal(true);
//             } catch (error) {
//                 console.error("Error submitting form:", error);
//             }
//         }
//     };

//     if (!isAuthenticated) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div className="introTag">
//             <h1 style={{ marginTop: "50px" }}>Hi, post your listing</h1>
//             <Form onSubmit={handleSubmit}>
//                 {/* Form Groups for input fields */}
//                 {/* ... [Rest of your form groups and inputs] */}
//                 <Form.Group className="mb-3" controlId="formBasicName">
//                     <Form.Label>Name</Form.Label>
//                     <Form.Control 
//                         type="text" 
//                         placeholder="Enter name" 
//                         value={formData.name}
//                         onChange={(e) => handleInputChange(e, 'name')} 
//                         isInvalid={!!errors.name}
//                     />
//                     <Form.Control.Feedback type="invalid">
//                         {errors.name}
//                     </Form.Control.Feedback>
//                 </Form.Group>
//                 <Form.Group className="mb-3" controlId="formBasicEmail">
//                     <Form.Label>Email Address</Form.Label>
//                     <Form.Control 
//                         type="email" 
//                         placeholder="Enter email" 
//                         value={formData.email}
//                         onChange={(e) => handleInputChange(e, 'email')} 
//                         isInvalid={!!errors.email}
//                     />
//                     <Form.Control.Feedback type="invalid">
//                         {errors.email}
//                     </Form.Control.Feedback>
//                 </Form.Group>
//                 <Form.Group className="mb-3" controlId="formBasicDepartureCity">
//                     <Form.Label>Departure City</Form.Label>
//                     <Form.Control 
//                         type="text" 
//                         placeholder="Enter departure city" 
//                         value={formData.departureCity}
//                         onChange={(e) => handleInputChange(e, 'departureCity')} 
//                     />
//                 </Form.Group>
//                 <Form.Group className="mb-3" controlId="formBasicDestination">
//                     <Form.Label>Destination</Form.Label>
//                     <Form.Control 
//                         type="text" 
//                         placeholder="Enter destination" 
//                         value={formData.destination}
//                         onChange={(e) => handleInputChange(e, 'destination')} 
//                     />
//                 </Form.Group>
//                 <Form.Group className="mb-3" controlId="formBasicFlightNum">
//                     <Form.Label>Flight Number</Form.Label>
//                     <Form.Control 
//                         type="text" 
//                         placeholder="Enter Flight Number" 
//                         value={formData.flightNum}
//                         onChange={(e) => handleInputChange(e, 'flightNum')} 
//                     />
//                 </Form.Group>
//                 <Form.Group className="mb-3" controlId="formBasicDate">
//                     <Form.Label>Date</Form.Label>
//                     <DatePicker
//                         selected={formData.date}
//                         onChange={handleDateChange}
//                         className="form-control"
//                     />
//                 </Form.Group>
//                 <Form.Group className="mb-3" controlId="formBasicTime">
//                     <Form.Label>Time</Form.Label>
//                     <Form.Control 
//                         type="time" 
//                         value={formData.time}
//                         onChange={(e) => handleInputChange(e, 'time')} 
//                     />
//                 </Form.Group>
//                 <Form.Group className="mb-3" controlId="formBasicAvailableSpace">
//                     <Form.Label>Available Space</Form.Label>
//                     <Form.Control 
//                         type="text" 
//                         placeholder="Enter available space" 
//                         value={formData.availableSpace}
//                         onChange={(e) => handleInputChange(e, 'availableSpace')} 
//                     />
//                 </Form.Group>
//                 <Form.Group className="mb-3" controlId="formBasicFlightCarrier">
//                     <Form.Label>Flight Carrier</Form.Label>
//                     <Form.Control 
//                         type="text" 
//                         placeholder="Enter Flight Carrier" 
//                         value={formData.FlightCarrier}
//                         onChange={(e) => handleInputChange(e, 'FlightCarrier')} 
//                     />
//                 </Form.Group>
//                 <Form.Group className="mb-3" controlId="formBasicAskingPrice">
//                     <Form.Label>Asking Price</Form.Label>
//                     <Form.Control 
//                         type="text" 
//                         placeholder="Enter Asking Price" 
//                         value={formData.AskingPrice}
//                         onChange={(e) => handleInputChange(e, 'AskingPrice')} 
//                     />
//                 </Form.Group>
//                 <Form.Group className="mb-3" controlId="formBasicAdditionalInfo">
//                     <Form.Label>Anything that the Buyer Should Know?</Form.Label>
//                     <Form.Control 
//                         as="textarea" 
//                         rows={3} 
//                         placeholder="Enter additional information" 
//                         value={formData.additionalInfo}
//                         onChange={(e) => handleInputChange(e, 'additionalInfo')} 
//                     />
//                 </Form.Group>
//                 <Button variant="primary" type="submit">
//                     Post My Listing
//                 </Button>
//             </Form>
//             <Modal show={showModal} onHide={() => setShowModal(false)}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>Success</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>Listing was successfully posted!</Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={() => setShowModal(false)}>
//                         Close
//                     </Button>
//                 </Modal.Footer>
//             </Modal>
//         </div>
//     );
// };

// export default Seller;






import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'; // Updated to use useNavigate
import { Button, Form, Modal } from 'react-bootstrap';
import './Seller.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

const Seller = () => {
    const [completionPercentage, setCompletionPercentage] = useState(0);

    const calculateCompletionPercentage = () => {
        const formFields = ['name', 'email', 'departureCity', 'destination', 'flightNum', 'time', 'availableSpace', 'FlightCarrier', 'askingPrice', 'additionalInfo'];
        let filledFields = formFields.reduce((acc, field) => acc + (formData[field] ? 1 : 0), 0);
        return Math.round((filledFields / formFields.length) * 100);
    };
    const navigate = useNavigate(); // Updated to useNavigate
    const initialFormData = {
        name: '',
        email: '',
        departureCity: '',
        destination: '',
        flightNum: '',
        date: new Date(),
        time: '',
        availableSpace: '',
        FlightCarrier: '',
        askingPrice: '',
        additionalInfo: ''
    };

    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    

    useEffect(() => {

   

        setCompletionPercentage(calculateCompletionPercentage());
        const token = window.localStorage.getItem("token");
        if (!token) {
            alert("You must be logged in to post a listing");
            navigate("/login"); // Updated to use navigate
        } else {
            setIsAuthenticated(true);
        }
    }, [navigate,formData]); // navigate added to the dependency array

    const handleInputChange = (e, field) => {
        setFormData({ ...formData, [field]: e.target.value });
    };

    const handleDateChange = (date) => {
        setFormData({ ...formData, date: date });
    };

    const validateForm = () => {
        let tempErrors = {};
        if (!formData.name) tempErrors.name = "Name is required";
        if (!formData.email) tempErrors.email = "Email is required";
        // Add more validation as needed
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await axios.post('https://backend-luggshare3.onrender.com/api/listings', formData);
                console.log(response.data);
                setFormData(initialFormData);
                setShowModal(true);
            } catch (error) {
                console.error("Error submitting form:", error);
            }
        }
    };

    if (!isAuthenticated) {
        return <div>Loading...</div>;
    }

    return (
        <div className="seller-container">
            <h1 className="form-title">Post your listing here!</h1>
            <progress value={completionPercentage} max="100"></progress> {/* Progress bar */}
            <div className="completion-percentage">Completion: {completionPercentage}%</div>
            <Form onSubmit={handleSubmit}>
                {/* Card 1: Basic Info */}

                
                <div className="postcard">
                    <div className="card-header">Basic Info</div>
                    <div className="card-bod">
                        {/* Name and Email form fields */}
                        {/* ... */}

                        <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter name" 
                        value={formData.name}
                        onChange={(e) => handleInputChange(e, 'name')} 
                        isInvalid={!!errors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.name}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Enter email" 
                        value={formData.email}
                        onChange={(e) => handleInputChange(e, 'email')} 
                        isInvalid={!!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.email}
                    </Form.Control.Feedback>
                </Form.Group>
                    </div>
                </div>

                {/* Card 2: Flight Info */}
                <div className="postcard">
                    <div className="card-header">Flight Info</div>
                    <div className="card-bod">
                        {/* Departure City, Destination, Flight Number, and Flight Carrier form fields */}
                        {/* Include your existing form groups for the above fields here */}
                        <Form.Group className="mb-3" controlId="formBasicDepartureCity">
                    <Form.Label>Departure City</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter departure city" 
                        value={formData.departureCity}
                        onChange={(e) => handleInputChange(e, 'departureCity')} 
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicDestination">
                    <Form.Label>Destination</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter destination" 
                        value={formData.destination}
                        onChange={(e) => handleInputChange(e, 'destination')} 
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicFlightNum">
                    <Form.Label>Flight Number</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter Flight Number" 
                        value={formData.flightNum}
                        onChange={(e) => handleInputChange(e, 'flightNum')} 
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicDate">
                    <Form.Label>Date</Form.Label>
                    <DatePicker
                        selected={formData.date}
                        onChange={handleDateChange}
                        className="form-control"
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicTime">
                    <Form.Label>Time</Form.Label>
                    <Form.Control 
                        type="time" 
                        value={formData.time}
                        onChange={(e) => handleInputChange(e, 'time')} 
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicAvailableSpace">
                    <Form.Label>Available Space</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter available space" 
                        value={formData.availableSpace}
                        onChange={(e) => handleInputChange(e, 'availableSpace')} 
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicFlightCarrier">
                    <Form.Label>Flight Carrier</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter Flight Carrier" 
                        value={formData.FlightCarrier}
                        onChange={(e) => handleInputChange(e, 'FlightCarrier')} 
                    />
                </Form.Group>
                        
                    </div>
                </div>

                {/* Card 3: Baggage Space */}
                <div className="postcard">
                    <div className="card-header">Baggage Space</div>
                    <div className="card-bod">
                        {/* Asking Price, Luggage Space, and Additional Info form fields */}
                        {/* Include your existing form groups for the above fields here */}
                        <Form.Group className="mb-3" controlId="formBasicAskingPrice">
                    <Form.Label>Asking Price</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter Asking Price" 
                        value={formData.askingPrice}
                        onChange={(e) => handleInputChange(e, 'askingPrice')} 
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicAdditionalInfo">
                    <Form.Label>Anything that the Buyer Should Know?</Form.Label>
                    <Form.Control 
                        as="textarea" 
                        rows={3} 
                        placeholder="Enter additional information" 
                        value={formData.additionalInfo}
                        onChange={(e) => handleInputChange(e, 'additionalInfo')} 
                    />
                </Form.Group>
                    </div>
                </div>

                <Button className="submit-btn" type="submit">
                    Post My Listing
                </Button>
            </Form>

            {/* Modal structure remains the same */}
            {/* ... */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>Listing was successfully posted!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Seller;