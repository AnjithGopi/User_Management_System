import { verifyToken } from "../utils/jwt.js";

const authMiddleware=(req,res,next)=>{

    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(403).json({ message: "Access denied, no token provided" });
    }
    const decoded = verifyToken(token);
    if (!decoded) {
        return res.status(401).json({ message: "Invalid token" });
    }

    req.user = decoded; // Attach user information to the request
    next(); // Proceed to the next middleware or route handler

}

export default authMiddleware;