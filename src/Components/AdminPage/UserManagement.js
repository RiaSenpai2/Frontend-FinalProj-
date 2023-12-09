import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserManagement.css';
import UserUpdateForm from './UserUpdateForm';

const UserManagement = ({ closePopup }) => {

    const closeModal = () => {
        setShowModal(false);
        setSelectedUser(null);
    };


    const updateUser = (user) => {
        setSelectedUser(user);
        setShowModal(true);
    };
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_HOST_URL}/api/user`);
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const deleteUser = async (userId) => {
        try {
            await axios.delete(`${process.env.REACT_APP_BACKEND_HOST_URL}/api/user/${userId}`);
            const updatedUsers = users.filter((user) => user._id !== userId);
            setUsers(updatedUsers);
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };


    // const updateUserDetails = async (updatedUser) => {
    //     try {
    //         const response = await axios.put(`${process.env.REACT_APP_BACKEND_HOST_URL}/api/user/${updatedUser._id}`, updatedUser);
    //         console.log('Updated user details:', response.data);
    //         setShowModal(false);
    //         fetchUsers(); // Refresh the user list
    //     } catch (error) {
    //         console.error('Error updating user:', error);
    //     }
    // };
    

    return (
        <div className="user-management">
            <h2>Manage Users</h2>
            <table className="user-table">
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user.email}</td>
                            <td>{user.fname}</td>
                            <td>{user.lname}</td>
                            <td>
                                <button className="delete-btn" onClick={() => deleteUser(user._id)}>
                                    Delete
                                </button>
                                {/* <button className="update-btn" onClick={() => updateUserDetails(user)}>
                                    Update
                                </button> */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* {selectedUser && showModal && (
                // <UserUpdateForm
                //     user={selectedUser}
                //     closeModal={closeModal}
                //     updateUserDetails={updateUserDetails}
                // />
            )} */}
        </div>
    );
};

export default UserManagement;
