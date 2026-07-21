const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({ error: 'Akses ditolak. Token tidak ditemukan.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_key_123');
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Token tidak valid.' });
    }
};

const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Akses ditolak. Hanya admin yang diizinkan.' });
    }
    next();
};

module.exports = { auth, isAdmin };
