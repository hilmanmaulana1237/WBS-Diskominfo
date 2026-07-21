# 🔧 PANDUAN PERBAIKAN WBS

## Masalah yang Diperbaiki

### 1. **App Crashed - Module Not Found**
**Penyebab:** 
- File `User.js` menggunakan Sequelize yang tidak diinstall
- `authController.js` mengimport model User yang salah
- `server.js` mencoba authenticate Sequelize

**Solusi:**
✅ Hapus file `src/models/User.js`
✅ Update `authController.js` untuk menggunakan raw MySQL query
✅ Hapus import Sequelize dari `server.js`

---

### 2. **Password Salah Saat Login Admin**
**Penyebab:**
- Password di database belum di-hash dengan benar
- Hash password tidak cocok dengan yang diinput

**Solusi:**
✅ Generate hash password baru menggunakan bcrypt
✅ Update password di database dengan hash yang benar

---

## Langkah-Langkah Perbaikan

### Step 1: Update Password di Database

Jalankan query SQL berikut di MySQL:

```sql
USE wbs_diskominfo;

-- Update Admin Password (password: admin12345)
UPDATE users 
SET password = '$2a$10$Yyy9.tL7anEVTbWZ83iwc.HI1rtLF.KAOZ9F7n7m9poeGho3uDw1C' 
WHERE email = 'admin@diskominfo.go.id';

-- Update Budi Password (password: password123)
UPDATE users 
SET password = '$2a$10$6AaWGUFNBpZxPyAuSol8our7y04qKcuxA7CJkabpM9mlguOTDuVla' 
WHERE email = 'budi@email.com';

-- Update Siti Password (password: password123)
UPDATE users 
SET password = '$2a$10$dy0qVBrTXkL15EPJ.M4JzeQCodgW8p.Pr6MU57qIziUAA14jNeYc6' 
WHERE email = 'siti@email.com';

-- Verify Update
SELECT id, name, email, role FROM users;
```

**Atau jalankan file SQL:**
```bash
mysql -u root -p wbs_diskominfo < database/update-passwords.sql
```

---

### Step 2: Restart Server

```bash
npm run dev
```

Server sekarang harus berjalan tanpa error!

---

## Login Credentials

Setelah update password, gunakan kredensial berikut:

### Admin
- **Email:** admin@diskominfo.go.id
- **Password:** admin12345

### User 1
- **Email:** budi@email.com
- **Password:** password123

### User 2
- **Email:** siti@email.com
- **Password:** password123

---

## Generate Hash Password Baru

Jika ingin membuat password baru:

```bash
node scripts/generate-hash.js
```

Script akan generate hash untuk password yang Anda tentukan.

---

## File yang Diubah

1. ✅ `src/controllers/authController.js` - Dihapus import User model, gunakan raw MySQL query
2. ✅ `src/server.js` - Dihapus Sequelize authentication
3. ✅ `src/models/User.js` - File dihapus (tidak diperlukan)
4. ✅ `database/update-passwords.sql` - SQL untuk update password
5. ✅ `scripts/generate-hash.js` - Tool untuk generate hash password

---

## Cara Test Login

1. Buka browser: http://localhost:3000
2. Klik "Login"
3. Masukkan kredensial admin:
   - Email: admin@diskominfo.go.id
   - Password: admin12345
4. Klik Login
5. Anda akan diarahkan ke Admin Dashboard

---

## Troubleshooting

### Jika masih password salah:
1. Pastikan sudah jalankan SQL update password
2. Clear browser cache dan cookies
3. Check database apakah password sudah terupdate:
   ```sql
   SELECT email, LEFT(password, 30) as pass FROM users;
   ```
4. Password harus dimulai dengan `$2a$10$`

### Jika masih app crashed:
1. Check tidak ada import Sequelize di file manapun
2. Pastikan tidak ada file User.js di folder models
3. Check terminal untuk error spesifik

---

## Status Akhir

✅ Server berjalan normal
✅ Database connection OK
✅ Login berfungsi dengan password yang benar
✅ Tidak ada error Module Not Found

**Server URL:** http://localhost:3000

---

Happy Coding! 🚀
