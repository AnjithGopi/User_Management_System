import "./AdminDash.css"

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


function AdminDash() {
    const [users, setUsers] = useState([])
    const [searchname,setSearchname]=useState('')
    const [editingUser, setEditingUser] = useState(null)
    const [updatedUsername, setUpdatedUsername] = useState('')
    const [updatedEmail, setUpdatedEmail] = useState('')
     

   
    const navigate=useNavigate()



   

    const fetchUsers = () => {
        const token = localStorage.getItem('token') 
        console.log("token:",token)
        fetch('http://localhost:4000/admin/users', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}` // Attach the token in the Authorization header
            }
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            return response.json()
        })
        .then((response) => {
            setUsers(response.data) 
            console.log("User data set successfully:",response.data)
            
        })
        .catch((error) => {
            console.error('Error fetching users:', error)
            
        });
    };




    useEffect(() => {   
        fetchUsers();
    }, []);


    const deleteUser=(userId)=>{

        console.log("user to delete:",userId)

        const token=localStorage.getItem('token')
        console.log("token to delete:",token)

        fetch(`http://localhost:4000/admin/users/${userId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response)=>{
            if(!response.ok){
                console.log("response not ok")
                throw new Error("failed to delete user")
            }

          

            console.log(`User with id ${userId} deleted successfully`);
            alert("Deleted successfully")
            setUsers(users.filter(user => user.id !== userId));
            fetchUsers()
           
        })
        .catch((error) => {
            console.error('Error deleting user:', error);
           
        });

    }


    const handleSearch=(event)=>{

        setSearchname(event.target.value);
    }


    const startEdit=(user)=>{
        setEditingUser(user)
        setUpdatedUsername(user.username)
        setUpdatedEmail(user.email)
    }


    const handleUpdate = (event) => {
        event.preventDefault();

        const token = localStorage.getItem('token');
        if (!token) {
            console.error("No token found");
            return;
        }

        console.log("Updating user:", editingUser._id, { username: updatedUsername, email: updatedEmail });


        fetch(`http://localhost:4000/admin/user/${editingUser._id}`, {
            method: 'PUT', 
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: updatedUsername, email: updatedEmail })
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to update user");
            }
            // Update local users state
            setUsers(users.map(user => user._id === editingUser._id ? { ...user, username: updatedUsername, email: updatedEmail } : user))
            setEditingUser(null); // Close the edit form
            alert("User updated successfully")
        })
        .catch((error) => {
            console.error('Error updating user:', error);
        });
    };





    const filteredUsers = users.filter(user =>
        user.username.toLowerCase().includes(searchname.toLowerCase()) 
        
    )

    const handleLogout=()=>{
        localStorage.removeItem('token')
        navigate("/admin/")
    }


    return (
        <div className="dashboard-container">

       <h1>welcome Admin</h1>

            

            <input 
                className="search-input"
                type="text" 
                placeholder="Search by username " 
                value={searchname} 
                onChange={handleSearch} 
            />
           
           {editingUser ? (
                <form onSubmit={handleUpdate}>
                    <h2>Edit User</h2>
                    <input 
                        type="text" 
                        value={updatedUsername} 
                        onChange={(e) => setUpdatedUsername(e.target.value)} 
                        placeholder="Username" 
                        required 
                    />
                    <input 
                        type="email" 
                        value={updatedEmail} 
                        onChange={(e) => setUpdatedEmail(e.target.value)} 
                        placeholder="Email" 
                        required 
                    />
                    <button type="submit">Update</button>
                    <button type="button" onClick={() => setEditingUser(null)}>Cancel</button>
                </form>
            ) : (

                <div className="table-container">
                    <table >
                    <thead>
                        <tr>
                            <th>Profile Picture</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map((user) => (
                                <tr key={user._id}>
                                    <td>
                                        <img src={user.profilePicture || "default-pic-url"} alt="User Profile" width="50" />
                                    </td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <button onClick={() => startEdit(user)}>Edit</button>
                                        <button onClick={() => deleteUser(user._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (

                            <div>
                                <h3>Admin need to log in</h3>
                            </div>
                           
                        )}
                    </tbody>
                </table>

                </div>

                
                
            )}
            <div>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
}

export default AdminDash;
