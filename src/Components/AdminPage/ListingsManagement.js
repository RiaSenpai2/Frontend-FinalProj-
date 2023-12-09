import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ListingsManagement.css'; 

const ListingsManagement = ({ closePopup }) => {
    const [listings, setListings] = useState([]);

    useEffect(() => {
        const fetchListings = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/listings');
                console.log('Fetched Listings:', response.data); 
                setListings(response.data);
            } catch (error) {
                console.error('Error fetching listings:', error);
            }
        };

        fetchListings();
    }, []);

    const deleteListing = async (listingId) => {
        try {
            await axios.delete(`http://localhost:5001/api/listings/${listingId}`);
            const updatedListings = listings.filter((listing) => listing.id !== listingId);
            setListings(updatedListings);
        } catch (error) {
            console.error('Error deleting listing:', error);
        }
    };

    // const updateListing = (listingId) => {
    //     // Implement update functionality as needed
    //     console.log(`Update listing with ID: ${listingId}`);
    // };

    return (
        <div className="listings-management">
            <h2>Manage Listings</h2>
            <table className="listings-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Departure City</th>
                        <th>Destination</th>
                        <th>Flight Number</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Available Space</th>
                        <th>Asking Price</th>
                        <th>Additional Info</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {listings.map((listing) => (
                        <tr key={listing._id}>
                            <td>{listing.name}</td>
                            <td>{listing.email}</td>
                            <td>{listing.departureCity}</td>
                            <td>{listing.destination}</td>
                            <td>{listing.flightNum}</td>
                            <td>{new Date(listing.date).toLocaleDateString()}</td>
                            <td>{listing.time}</td>
                            <td>{listing.availableSpace}</td>
                            <td>{listing.askingPrice}</td>
                            <td>{listing.additionalInfo}</td>
                            <td>
                                <button className="delete-btn" onClick={() => deleteListing(listing._id)}>Delete</button>
                                {/* <button className="update-btn" onClick={() => updateListing(listing._id)}>Update</button> */}
                                {/* Add update functionality here */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListingsManagement;
