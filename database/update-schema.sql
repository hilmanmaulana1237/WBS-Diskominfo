-- Update Schema untuk fitur baru WBS
USE wbs_diskominfo;

-- Tambah kolom is_active di tabel users (untuk fitur enable/disable user)
ALTER TABLE users ADD COLUMN is_active BOOLEAN DEFAULT TRUE AFTER role;

-- Tambah kolom baru di tabel reports untuk klasifikasi laporan
ALTER TABLE reports 
ADD COLUMN jenis_laporan ENUM('saran', 'aduan') DEFAULT 'aduan' AFTER description,
ADD COLUMN instansi_tujuan VARCHAR(255) AFTER jenis_laporan,
ADD COLUMN lokasi_kejadian VARCHAR(500) AFTER instansi_tujuan;

-- Update existing reports dengan nilai default
UPDATE reports SET jenis_laporan = 'aduan' WHERE jenis_laporan IS NULL;
UPDATE reports SET instansi_tujuan = 'Dinas Komunikasi dan Informatika' WHERE instansi_tujuan IS NULL;
UPDATE reports SET lokasi_kejadian = 'Tidak disebutkan' WHERE lokasi_kejadian IS NULL;

-- Verifikasi perubahan
SELECT * FROM users LIMIT 5;
SELECT * FROM reports LIMIT 5;
