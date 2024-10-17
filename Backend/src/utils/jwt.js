
import jwt from "jsonwebtoken"


// Function to generate a JWT token
export const generateToken = (user) => {
    // Create a payload with user information
    const payload = {
        id: user._id,
        username: user.username,
    };

    // Sign the token with a secret key and set an expiration time
    console.log("token generated:",jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }))
   return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }); // Change expiration time as needed


}



// Function to verify a JWT token
export const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return null;
    }
};

