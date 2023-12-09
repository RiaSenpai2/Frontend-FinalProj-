import React, { useState } from 'react';
import axios from 'axios';
import './ResetPassword.css';


const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.put('http://localhost:5001/api/user/change-password', {
                email,
                oldPassword,
                newPassword
            });
            console.log(response.data.message);
            // Handle success (e.g., show confirmation message)
            alert("Password updated successfully!");
            window.location.href = "./login";
        } catch (error) {
            console.error('Error updating password:', error);
            // Handle errors (e.g., show error message)
        }
    };
    

    return (
        <div className="reset-password">
            <h2>Reset Your Password</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label htmlFor="oldPassword">Old Password:</label>
                <input
                    type="password"
                    id="oldPassword"
                    name="oldPassword"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    required
                />

                <label htmlFor="newPassword">New Password:</label>
                <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />

                <button type="submit">Reset Password</button>
            </form>
        </div>
    );
};

export default ResetPassword;
