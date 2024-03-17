const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const token = req.header('Authorization');
    if(!token) return res.status(401).json({ message: 'Access denied' });
    try {
        const decoded = jwt.verify(token, 'touhid-nunu');
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' })
    }
}

module.exports = {
    verifyToken
};