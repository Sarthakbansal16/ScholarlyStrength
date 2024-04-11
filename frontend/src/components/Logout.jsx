import React from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { logoutRoute } from '../utils/ApiRoutes';
import Cookies from 'js-cookie'

const Logout = () => {
    const navigate = useNavigate();

    // Function to handle logout
    const handleLogout = async () => {
        try {
            const accessToken = Cookies.get('accessToken');
            
            if (accessToken) {
                // Perform a POST request to the logout endpoint
                const response = await axios.post(logoutRoute, {}, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    }
                });

                if (response.status === 200) {
                    // If logout is successful, remove cookies for accessToken and refreshToken
                    Cookies.remove('accessToken');
                    Cookies.remove('refreshToken');

                    // Navigate to the login page
                    navigate('/'); // Adjust the route as needed
                } else {
                    console.error('Logout failed:', response.status);
                }
            } else {
                console.error('Access token is missing');
            }
        } catch (error) {
            console.error('An error occurred while logging out:', error);
        }
    };

    return (
        <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200"
        >
            Logout
        </button>
    );
};

export default Logout