const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const reportRoutes = require('./routes/reportRoutes');
const staticRoutes = require('./routes/staticRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (frontend)
app.use(express.static(path.join(__dirname, '../public')));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Serve node_modules assets (Bootstrap, etc)
app.use('/assets', staticRoutes);

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api', userRoutes);

// Root route - serve landing page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// TEMPORARY DB SETUP ROUTE
app.get('/api/setup-database', async (req, res) => {
    try {
        const pool = require('./config/database');
        
        await pool.query('DROP TABLE IF EXISTS reports;');
        await pool.query('DROP TABLE IF EXISTS users;');

        await pool.query(`
            CREATE TABLE users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                role ENUM('user', 'admin') DEFAULT 'user',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            );
        `);

        await pool.query(`
            CREATE TABLE reports (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description TEXT NOT NULL,
                date DATE NOT NULL,
                status ENUM('pending', 'diterima', 'diproses', 'selesai', 'ditolak') DEFAULT 'pending',
                file_path VARCHAR(500),
                user_id INT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            );
        `);

        await pool.query(`
            INSERT INTO users (name, email, password, role) VALUES 
            ('Admin WBS', 'admin@diskominfo.go.id', '$2a$10$rOZ7VH9YYVOVJqxmYWQp/uXNlH9vC5XGJ4YqN6Qd7nqHZBK/Wm8qK', 'admin'),
            ('Budi Santoso', 'budi@email.com', '$2a$10$rOZ7VH9YYVOVJqxmYWQp/uXNlH9vC5XGJ4YqN6Qd7nqHZBK/Wm8qK', 'user');
        `);

        await pool.query(`
            INSERT INTO reports (title, description, date, status, user_id) VALUES 
            ('Dugaan Penyalahgunaan Anggaran', 'Indikasi penyalahgunaan anggaran.', '2026-01-15', 'diproses', 2);
        `);

        res.send('<h1>✅ Database berhasil di-setup! Silakan kembali ke halaman utama dan coba login.</h1>');
    } catch (error) {
        res.send('<h1>❌ Gagal setup database: ' + error.message + '</h1>');
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        error: 'Terjadi kesalahan pada server',
        message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint tidak ditemukan' });
});

// Start server
app.listen(PORT, () => {
    console.log(`✓ Server berjalan pada port ${PORT}`);
    console.log(`✓ Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`✓ URL: http://localhost:${PORT}`);
});

module.exports = app;
