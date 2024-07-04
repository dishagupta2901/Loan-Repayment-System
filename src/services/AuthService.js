import axios from 'axios';

const API_URL = 'http://localhost:5000/users'; // Replace with your API URL

const authService = {
    login: async (username, password) => {
        console.log('Login', username, password);
        try {
            // Make a request to get the user by username
            const response = await axios.get(`${API_URL}?username=${username}`);
            const users = response.data;

            // Assuming API returns an array of users (in case of multiple matches)
            if (users && users.length > 0) {
                const user = users.find(user => user.username === username);
                if (user) {
                    if (user.password === password) {
                        return user;
                    } else {
                        throw new Error('Invalid password');
                    }
                } else {
                    throw new Error('Invalid username');
                }
            } else {
                throw new Error('Invalid username');
            }
        } catch (error) {
            throw error; // Handle errors appropriately in your application
        }
    }
};

export default authService;
