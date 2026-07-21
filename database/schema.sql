-- Database Schema untuk Whistle Blowing System
-- Buat database
CREATE DATABASE IF NOT EXISTS wbs_diskominfo;
USE wbs_diskominfo;

-- Tabel Users
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabel Reports
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

-- Insert dummy admin
INSERT INTO users (name, email, password, role) VALUES 
('Admin WBS', 'admin@diskominfo.go.id', '$2a$10$YourHashedPasswordHere', 'admin');

-- Insert dummy users
INSERT INTO users (name, email, password, role) VALUES 
('Budi Santoso', 'budi@email.com', '$2a$10$YourHashedPasswordHere', 'user'),
('Siti Aminah', 'siti@email.com', '$2a$10$YourHashedPasswordHere', 'user');

-- Insert dummy reports
INSERT INTO reports (title, description, date, status, user_id) VALUES 
('Dugaan Penyalahgunaan Anggaran', 'Terdapat indikasi penyalahgunaan anggaran di bagian pengadaan dengan nilai sekitar 500 juta rupiah', '2026-01-15', 'diproses', 2),
('Pelanggaran Etika Pegawai', 'Pegawai A melakukan intimidasi kepada bawahan dan menciptakan lingkungan kerja yang tidak kondusif', '2026-01-20', 'diterima', 3),
('Korupsi Pengadaan Barang', 'Markup harga dalam pengadaan komputer dan peralatan kantor', '2026-01-25', 'pending', 2);

SELECT * FROM users WHERE email = 'admin@diskominfo.go.id';