-- Script untuk membuat user dummy dengan password yang sudah di-hash
-- Password untuk semua user: password123
-- Hash bcrypt untuk "password123": $2a$10$rOZ7VH9YYVOVJqxmYWQp/uXNlH9vC5XGJ4YqN6Qd7nqHZBK/Wm8qK

USE wbs_diskominfo;

-- Clear existing data (optional)
-- DELETE FROM reports;
-- DELETE FROM users;

-- Insert Admin
INSERT INTO users (name, email, password, role) VALUES 
('Admin WBS', 'admin@diskominfo.go.id', '$2a$10$rOZ7VH9YYVOVJqxmYWQp/uXNlH9vC5XGJ4YqN6Qd7nqHZBK/Wm8qK', 'admin');

-- Insert Dummy Users
INSERT INTO users (name, email, password, role) VALUES 
('Budi Santoso', 'budi@email.com', '$2a$10$rOZ7VH9YYVOVJqxmYWQp/uXNlH9vC5XGJ4YqN6Qd7nqHZBK/Wm8qK', 'user'),
('Siti Aminah', 'siti@email.com', '$2a$10$rOZ7VH9YYVOVJqxmYWQp/uXNlH9vC5XGJ4YqN6Qd7nqHZBK/Wm8qK', 'user'),
('Ahmad Fauzi', 'ahmad@email.com', '$2a$10$rOZ7VH9YYVOVJqxmYWQp/uXNlH9vC5XGJ4YqN6Qd7nqHZBK/Wm8qK', 'user'),
('Rina Wati', 'rina@email.com', '$2a$10$rOZ7VH9YYVOVJqxmYWQp/uXNlH9vC5XGJ4YqN6Qd7nqHZBK/Wm8qK', 'user');

-- Insert Dummy Reports
INSERT INTO reports (title, description, date, status, user_id) VALUES 
(
    'Dugaan Penyalahgunaan Anggaran di Bagian Pengadaan',
    'Terdapat indikasi penyalahgunaan anggaran pada proyek pengadaan perangkat komputer di tahun 2025. Nilai kontrak mencapai 500 juta rupiah namun spesifikasi barang yang diterima tidak sesuai dengan dokumen tender. Saya memiliki dokumen pendukung berupa foto barang dan salinan dokumen tender.',
    '2026-01-15',
    'diproses',
    2
),
(
    'Pelanggaran Etika Pegawai - Intimidasi di Lingkungan Kerja',
    'Pegawai dengan inisial AP melakukan intimidasi dan pelecehan verbal kepada beberapa staf junior. Sudah beberapa kali dilaporkan ke atasan langsung namun tidak ada tindakan. Hal ini menciptakan lingkungan kerja yang tidak kondusif dan banyak pegawai merasa tertekan.',
    '2026-01-20',
    'diterima',
    3
),
(
    'Korupsi dalam Proyek Infrastruktur IT',
    'Terdapat praktik markup harga dalam pengadaan server dan infrastruktur jaringan. Harga yang tercantum dalam kontrak jauh lebih tinggi dibanding harga pasar. Diperkirakan markup mencapai 40% dari harga normal.',
    '2026-01-25',
    'pending',
    2
),
(
    'Gratifikasi kepada Pejabat Tertentu',
    'Beberapa vendor memberikan gratifikasi berupa uang dan barang kepada pejabat tertentu untuk memenangkan tender pengadaan. Praktik ini sudah berlangsung selama bertahun-tahun.',
    '2026-01-28',
    'diterima',
    4
),
(
    'Nepotisme dalam Penerimaan Pegawai',
    'Proses rekrutmen pegawai tidak transparan. Beberapa kandidat yang diterima memiliki hubungan keluarga dengan pejabat tinggi meskipun nilai tes mereka lebih rendah dari kandidat lain.',
    '2026-02-01',
    'selesai',
    3
),
(
    'Penyalahgunaan Kendaraan Dinas',
    'Kendaraan dinas digunakan untuk keperluan pribadi di luar jam kerja. Hal ini terjadi secara rutin dan mengakibatkan biaya operasional yang membengkak.',
    '2026-02-03',
    'pending',
    4
);

-- Verify data
SELECT 'Users Created:' as Info;
SELECT id, name, email, role FROM users;

SELECT 'Reports Created:' as Info;
SELECT r.id, r.title, u.name as pelapor, r.status, r.date 
FROM reports r 
JOIN users u ON r.user_id = u.id 
ORDER BY r.created_at DESC;
