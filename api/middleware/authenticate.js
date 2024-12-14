const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    try {
        // Extract token from the Authorization header
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: 'Authorization header missing' });
        }

        const token = authHeader.split(' ')[1]; // Extract token from 'Bearer <token>'
        if (!token) {
            return res.status(401).json({ message: 'Token missing from Authorization header' });
        }

        // Verify the token
        const decoded = jwt.verify(token,'SECRET');

        // Attach the decoded user info to the request object
        req.user = decoded;

        // Pass control to the next middleware
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Authentication Failed', error: error.message });
    }
};

module.exports = authenticate;