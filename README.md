# Whistle Blowing System (WBS) - Diskominfo

Aplikasi web Whistle Blowing System untuk pelaporan pelanggaran dengan fitur lengkap autentikasi, role-based access, dan manajemen laporan.

## 🚀 Fitur Utama

### Landing Page
- Informasi lengkap tentang WBS
- Kriteria laporan yang dapat dilaporkan
- Alur pelaporan yang jelas
- Desain profesional dengan tema pemerintahan

### Autentikasi
- Register user baru
- Login user dan admin
- Password hashing dengan bcryptjs
- JWT authentication
- Session management

### User (Pelapor)
- Form laporan dengan upload file bukti
- Lihat daftar laporan sendiri
- Tracking status laporan real-time
- Dashboard interaktif

### Admin
- Dashboard dengan statistik laporan
- Lihat semua laporan dari semua user
- Detail lengkap setiap laporan
- Update status laporan (pending, diterima, diproses, selesai, ditolak)
- Auto refresh data

### Keamanan
- Role-based access control (admin & user)
- Protected routes dengan middleware
- Input validation
- File upload validation
- SQL injection prevention

## 📁 Struktur Folder

```
WBS Diskominfo/
├── database/
│   └── schema.sql              # Database schema
├── public/
│   ├── css/
│   │   └── style.css           # Custom styles
│   ├── js/
│   │   └── app.js              # Frontend utilities
│   ├── index.html              # Landing page
│   ├── login.html              # Login page
│   ├── register.html           # Register page
│   ├── user-dashboard.html     # User dashboard
│   └── admin-dashboard.html    # Admin dashboard
├── src/
│   ├── config/
│   │   └── database.js         # Database connection
│   ├── controllers/
│   │   ├── authController.js   # Auth logic
│   │   └── reportController.js # Report logic
│   ├── middleware/
│   │   ├── auth.js             # Authentication middleware
│   │   └── upload.js           # File upload middleware
│   ├── routes/
│   │   ├── authRoutes.js       # Auth routes
│   │   └── reportRoutes.js     # Report routes
│   └── server.js               # Main server file
├── uploads/                    # Uploaded files directory
├── .env.example               # Environment variables template
├── .gitignore
├── package.json
└── README.md
```

## 🛠️ Teknologi

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MySQL** - Database
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **multer** - File upload handling
- **express-validator** - Input validation

### Frontend
- **HTML5** - Markup
- **CSS3** - Styling dengan gradient dan backdrop filter
- **Bootstrap 5.3.8** - UI framework (local installation)
- **Bootstrap Icons** - Icon library
- **Google Fonts (Poppins)** - Typography
- **Vanilla JavaScript** - Interactivity

## 📦 Instalasi

### Prerequisites
- Node.js (v14 atau lebih baru)
- MySQL (v5.7 atau lebih baru)
- npm atau yarn

### Langkah Instalasi

1. **Clone atau Download Project**
   ```bash
   cd "d:\WBS Diskominfo"
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```
   
3. **Copy Bootstrap Assets**
   ```bash
   npm run copy-assets
   ```
   Script ini akan menyalin Bootstrap dan Bootstrap Icons dari node_modules ke folder public/assets

4. **Setup Database**
   - Buka MySQL dan buat database baru:
   ```sql
   CREATE DATABASE wbs_diskominfo;
   ```
   - Import schema dari file `database/schema.sql`:
   ```bash
   mysql -u root -p wbs_diskominfo < database/schema.sql
   ```
   Atau jalankan script SQL di MySQL Workbench/phpMyAdmin

4. **Konfigurasi Environment**
   - Copy file `.env.example` menjadi `.env`:
   ```bash
   copy .env.example .env
   ```
   - Edit file `.env` sesuai konfigurasi Anda:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=wbs_diskominfo
   DB_PORT=3306

   JWT_SECRET=your_very_secret_key_here
   JWT_EXPIRE=7d

   PORT=3000
   NODE_ENV=development
   ```

5. **Buat Admin User**
   Untuk membuat admin pertama kali, jalankan query SQL berikut (ganti password hash dengan hasil dari bcrypt):
   ```sql
   INSERT INTO users (name, email, password, role) VALUES 
   ('Admin WBS', 'admin@diskominfo.go.id', '$2a$10$YourHashedPasswordHere', 'admin');
   ```
   
   Atau gunakan tool online bcrypt untuk hash password Anda: https://bcrypt-generator.com/
   Contoh: untuk password "password123", hash bcrypt-nya adalah:
   ```
   $2a$10$rOZ7VH9YYVOVJqxmYWQp/uXNlH9vC5XGJ4YqN6Qd7nqHZBK/Wm8qK
   ```

## 🚀 Menjalankan Aplikasi

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

Server akan berjalan di: **http://localhost:3000**

## 👥 Default Login

Untuk testing, gunakan akun berikut (pastikan sudah dibuat di database):

### Admin
- Email: `admin@diskominfo.go.id`
- Password: `password123`

### User
- Email: `budi@email.com`
- Password: `password123`

**PENTING:** Ganti password default setelah login pertama kali!

## 📖 API Documentation

### Authentication

#### Register User
```
POST /api/auth/register
Body: {
  "name": "string",
  "email": "string",
  "password": "string"
}
```

#### Login
```
POST /api/auth/login
Body: {
  "email": "string",
  "password": "string"
}
Response: {
  "token": "jwt_token",
  "user": { ... }
}
```

#### Get Current User
```
GET /api/auth/me
Headers: Authorization: Bearer {token}
```

### Reports (User)

#### Create Report
```
POST /api/reports
Headers: Authorization: Bearer {token}
Content-Type: multipart/form-data
Body: {
  "title": "string",
  "description": "string",
  "date": "YYYY-MM-DD",
  "file": "file (optional)"
}
```

#### Get My Reports
```
GET /api/reports/my-reports
Headers: Authorization: Bearer {token}
```

#### Get Report Detail
```
GET /api/reports/:id
Headers: Authorization: Bearer {token}
```

### Reports (Admin)

#### Get All Reports
```
GET /api/reports/admin/all
Headers: Authorization: Bearer {token}
```

#### Get Report Detail
```
GET /api/reports/admin/:id
Headers: Authorization: Bearer {token}
```

#### Update Report Status
```
PUT /api/reports/admin/:id/status
Headers: Authorization: Bearer {token}
Body: {
  "status": "pending|diterima|diproses|selesai|ditolak"
}
```

#### Get Statistics
```
GET /api/reports/admin/statistics/data
Headers: Authorization: Bearer {token}
```

## 🎨 Tampilan

### Landing Page
- Hero section dengan informasi WBS
- Fitur keamanan, kecepatan, dan transparansi
- Kriteria laporan
- Alur pelaporan 4 tahap

### User Dashboard
- Form pembuatan laporan baru
- Tabel daftar laporan sendiri
- Status tracking dengan badge warna
- Modal detail laporan

### Admin Dashboard
- 4 Card statistik (Total, Pending, Diproses, Selesai)
- Tabel semua laporan dari semua user
- Update status laporan
- Auto refresh setiap 30 detik

## 🔒 Keamanan

1. **Password Hashing**: Menggunakan bcryptjs dengan salt rounds 10
2. **JWT Authentication**: Token expire dalam 7 hari
3. **Role-Based Access**: Middleware untuk proteksi route admin
4. **Input Validation**: Express-validator untuk validasi input
5. **File Upload Validation**: 
   - Tipe file: JPEG, PNG, PDF, DOC, DOCX
   - Max size: 5MB
6. **SQL Injection Prevention**: Menggunakan prepared statements
7. **CORS Protection**: CORS middleware

## 🐛 Troubleshooting

### Database Connection Error
- Pastikan MySQL sudah berjalan
- Cek konfigurasi di file `.env`
- Pastikan database sudah dibuat

### Port Already in Use
- Ganti PORT di file `.env`
- Atau stop aplikasi yang menggunakan port tersebut

### File Upload Error
- Pastikan folder `uploads/` ada dan memiliki permission write
- Cek ukuran file tidak lebih dari 5MB

### JWT Token Invalid
- Pastikan JWT_SECRET di `.env` sudah diset
- Cek token belum expired
- Clear localStorage browser dan login ulang

## 📝 Catatan Penting

1. **Production Deployment**:
   - Ganti JWT_SECRET dengan string random yang kuat
   - Set NODE_ENV=production
   - Gunakan HTTPS
   - Setup reverse proxy (nginx/apache)
   - Enable rate limiting

2. **Database**:
   - Backup database secara berkala
   - Gunakan connection pooling untuk production
   - Index pada kolom yang sering di-query

3. **File Upload**:
   - Pertimbangkan menggunakan cloud storage (AWS S3, Google Cloud Storage)
   - Implement virus scanning untuk uploaded files

## 📄 License

ISC License - Free to use for government projects

## 👨‍💻 Developer

Dikembangkan untuk Dinas Komunikasi dan Informatika

## 📞 Kontak

Untuk pertanyaan atau dukungan:
- Email: wbs@diskominfo.go.id
- Telp: (021) 123-4567

---

**Whistle Blowing System - Bersama Wujudkan Pemerintahan yang Bersih dan Transparan**
