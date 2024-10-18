import "./AdminDash.css";
import { useEffect, useState } from "react";

function AdminDash() {
    const [users, setUsers] = useState([]);
    // const [error, setError] = useState('');

    useEffect(() => {
        const fetchUsers = () => {
            const token = localStorage.getItem('token'); // Retrieve the token from localStorage
            console.log("token:",token)
            fetch('http://localhost:4000/admin/users', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}` // Attach the token in the Authorization header
                }
            })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((response) => {
                setUsers(response.data); // Assuming the response data is an array of user objects
                console.log("User data set successfully:",response.data);
                
            })
            .catch((error) => {
                console.error('Error fetching users:', error);
                // setError('Failed to fetch users. Please try again later.'); // Set error message
            });
        };

        fetchUsers();
    }, []);


    const deleteUser=()=>{

    }

    return (
        <div>
            <h1>Welcome Admin!</h1>
            {/* {error && <p style={{ color: 'red' }}>{error}</p>} Show error message */}
            <table>
                <thead>
                    <tr>
                        <th>Profile Picture</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? (
                        users.map((user) => (
                            <tr key={user.id}> {/* Assuming each user has a unique 'id' */}
                                <td>
                                    <img src={user.profilePicture || "default-pic-url"} alt="User Profile" width="50" />
                                </td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>
                                    <button>Edit</button>
                                    <button onClick={deleteUser}>Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No users found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default AdminDash;
