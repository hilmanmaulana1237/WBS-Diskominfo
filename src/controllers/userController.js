const db = require('../config/database');

// Get all users (Admin only)
exports.getAllUsers = async (req, res) => {
    try {
        const [users] = await db.query(
            'SELECT id, name, email, role, is_active, created_at FROM users WHERE role = "user" ORDER BY created_at DESC'
        );
        
        res.json({ users });
    } catch (error) {
        console.error('Get all users error:', error);
        res.status(500).json({ error: 'Terjadi kesalahan pada server' });
    }
};

// Toggle user status (Admin only)
exports.toggleUserStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { is_active } = req.body;
        
        // Validasi input
        if (typeof is_active !== 'boolean') {
            return res.status(400).json({ error: 'Status harus berupa boolean' });
        }
        
        // Cek apakah user ada dan bukan admin
        const [users] = await db.query('SELECT role FROM users WHERE id = ?', [id]);
        if (users.length === 0) {
            return res.status(404).json({ error: 'User tidak ditemukan' });
        }
        
        if (users[0].role === 'admin') {
            return res.status(403).json({ error: 'Tidak dapat mengubah status admin' });
        }
        
        // Update status
        await db.query(
            'UPDATE users SET is_active = ? WHERE id = ?',
            [is_active, id]
        );
        
        res.json({ 
            message: `User berhasil ${is_active ? 'diaktifkan' : 'dinonaktifkan'}`,
            is_active 
        });
    } catch (error) {
        console.error('Toggle user status error:', error);
        res.status(500).json({ error: 'Terjadi kesalahan pada server' });
    }
};

module.exports = exports;
