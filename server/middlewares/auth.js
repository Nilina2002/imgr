import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
    try {
        const {token} = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Unauthorized access" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded.id) {
            return res.status(401).json({ message: "Invalid token" });

            //STOPPED HERE
}
        req.user = decoded; // Attach user info to request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error("Authentication error:", error);
        res.status(401).json({ message: "Invalid token" });
    }
}