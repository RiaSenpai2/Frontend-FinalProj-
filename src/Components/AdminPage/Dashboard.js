import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Authentication/AuthContext';
import UserManagement from './UserManagement'; 
import ListingsManagement from './ListingsManagement';
import QueryManagement from './QueryManagement';
import './Dashboard.css';

const Dashboard = () => {
    const { setIsLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);
    const [popupContent, setPopupContent] = useState('');

    // Dummy query data
    const dummyQueries = [
        { id: 1, user: "User1", query: "How do I update my profile?" },
        { id: 2, user: "User2", query: "What is the listing fee?" },
        // ... more queries
    ];

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        console.log("Is Logged In:", isLoggedIn); // Debugging line
        if (!isLoggedIn) {
          navigate('/admin/login');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        navigate('/admin/login'); 
    };

    const handleBoxClick = (content) => {
        setShowPopup(true);
        setPopupContent(content);
    };

    const closePopup = () => {
        setShowPopup(false);
        setPopupContent('');
    };

    return (
        <div className="dashboard">
            <h1> Admin <br></br> Dashboard</h1>
            <div className="box users" onClick={() => handleBoxClick("Manage Users")}>
                <h2>Manage Users</h2>
            </div>
            <div className="box listings" onClick={() => handleBoxClick("Manage Listings")}>
                <h2>Manage Listings</h2>
            </div>
            <div className="box queries" onClick={() => handleBoxClick("Reply to Queries")}>
                <h2>Reply to Queries</h2>
            </div>

            {/* Popup */}
            {showPopup && (
                <div className="popup-background">
                    <div className="popup">
                        <div className="popup-content">
                            {popupContent === "Manage Users" && <UserManagement closePopup={closePopup} />}
                            {popupContent === "Manage Listings" && <ListingsManagement closePopup={closePopup} />}
                            {popupContent === "Reply to Queries" && <QueryManagement queries={dummyQueries} closePopup={closePopup} />}
                            <button onClick={closePopup}>Close</button>
                        </div>
                    </div>
                </div>
            )}

            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Dashboard;
