const pool = require('../src/config/database');

async function setupDatabase() {
    try {
        console.log('Menghubungkan ke database Aiven...');
        
        console.log('1. Menghapus tabel lama (jika ada)...');
        await pool.query('DROP TABLE IF EXISTS reports;');
        await pool.query('DROP TABLE IF EXISTS users;');

        console.log('2. Membuat tabel users...');
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

        console.log('3. Membuat tabel reports...');
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

        console.log('4. Memasukkan akun admin dan user...');
        await pool.query(`
            INSERT INTO users (name, email, password, role) VALUES 
            ('Admin WBS', 'admin@diskominfo.go.id', '$2a$10$rOZ7VH9YYVOVJqxmYWQp/uXNlH9vC5XGJ4YqN6Qd7nqHZBK/Wm8qK', 'admin'),
            ('Budi Santoso', 'budi@email.com', '$2a$10$rOZ7VH9YYVOVJqxmYWQp/uXNlH9vC5XGJ4YqN6Qd7nqHZBK/Wm8qK', 'user');
        `);

        console.log('5. Memasukkan laporan dummy...');
        await pool.query(`
            INSERT INTO reports (title, description, date, status, user_id) VALUES 
            ('Dugaan Penyalahgunaan Anggaran', 'Indikasi penyalahgunaan anggaran di bagian pengadaan.', '2026-01-15', 'diproses', 2);
        `);

        console.log('✅ SETUP DATABASE SELESAI DAN BERHASIL!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Gagal setup database:', error);
        process.exit(1);
    }
}

setupDatabase();
