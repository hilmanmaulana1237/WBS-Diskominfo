# Update Package Dependencies dan Database Schema

## Dependencies yang Ditambahkan:
- pdfkit (untuk export PDF)
- json2csv (untuk export CSV)

## Instruksi Instalasi:

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Update Database Schema:**
   Jalankan file SQL untuk update schema:
   ```bash
   mysql -u root -p wbs_diskominfo < database/update-schema.sql
   ```

   Atau via MySQL Workbench/phpMyAdmin:
   - Buka file `database/update-schema.sql`
   - Execute semua query

3. **Verifikasi Instalasi:**
   - Pastikan tidak ada error saat install dependencies
   - Cek tabel `users` memiliki kolom `is_active`
   - Cek tabel `reports` memiliki kolom `jenis_laporan`, `instansi_tujuan`, `lokasi_kejadian`

4. **Run Server:**
   ```bash
   npm run dev
   ```

## Testing Checklist:

### 1. User Management (Admin)
- [ ] Admin dapat melihat list user
- [ ] Admin dapat mengaktifkan user
- [ ] Admin dapat menonaktifkan user
- [ ] User nonaktif tidak bisa login

### 2. Form Laporan (User)
- [ ] Field jenis laporan (aduan/saran) wajib diisi
- [ ] Field instansi tujuan wajib diisi
- [ ] Field lokasi kejadian wajib diisi
- [ ] Checkbox persetujuan harus dicentang untuk submit
- [ ] Form tidak bisa disubmit jika checkbox belum dicentang

### 3. Halaman Detail Laporan
- [ ] User dapat melihat detail laporan sendiri
- [ ] Admin dapat melihat detail semua laporan
- [ ] Tampil semua field: jenis, instansi, lokasi
- [ ] Button export PDF berfungsi
- [ ] Button export CSV berfungsi (admin)

### 4. Export PDF
- [ ] PDF terbuat dengan format lengkap
- [ ] PDF berisi header dan footer
- [ ] PDF berisi semua data laporan
- [ ] Admin melihat informasi pelapor di PDF

### 5. Export CSV
- [ ] CSV terbuat dengan encoding UTF-8
- [ ] CSV berisi semua kolom yang diperlukan
- [ ] Filter diterapkan pada export CSV
- [ ] File CSV dapat dibuka di Excel/Spreadsheet

### 6. Filter Laporan (Admin)
- [ ] Filter per bulan berfungsi
- [ ] Filter per tahun berfungsi
- [ ] Filter rentang tanggal berfungsi
- [ ] Filter jenis laporan berfungsi
- [ ] Filter dapat dikombinasikan
- [ ] Reset filter berfungsi

### 7. Chart di Homepage
- [ ] Chart jenis laporan (doughnut) muncul
- [ ] Chart status laporan (bar) muncul
- [ ] Data chart sesuai dengan database
- [ ] Chart responsive di mobile

## Troubleshooting:

### Error: Cannot find module 'pdfkit'
```bash
npm install pdfkit --save
```

### Error: Cannot find module 'json2csv'
```bash
npm install json2csv --save
```

### Error: Column 'is_active' doesn't exist
Jalankan database migration:
```bash
mysql -u root -p wbs_diskominfo < database/update-schema.sql
```

### Chart tidak muncul di homepage
- Cek console browser untuk error
- Pastikan endpoint `/api/reports/stats` return data
- Pastikan Chart.js CDN terload

### Export PDF kosong atau error
- Pastikan pdfkit terinstall
- Cek permission folder untuk write file
- Cek console error di backend

## Fitur Baru yang Ditambahkan:

1. ✅ Role Admin - Enable/Disable User
2. ✅ Form Laporan dengan Klasifikasi (Jenis, Instansi, Lokasi)
3. ✅ Halaman Detail Laporan (Page Baru)
4. ✅ Info, Pernyataan, dan Checklist di Form
5. ✅ Landing Page Chart (Jenis & Status)
6. ✅ Export PDF per Laporan
7. ✅ Export CSV Massal dengan Filter
8. ✅ Filter Laporan (Bulan, Tahun, Rentang Tanggal, Jenis)

## Struktur File Baru:

```
src/
  ├── controllers/
  │   ├── userController.js      (NEW)
  │   ├── exportController.js    (NEW)
  ├── routes/
  │   ├── userRoutes.js          (NEW)

public/
  ├── report-detail.html         (NEW)

database/
  ├── update-schema.sql          (NEW)
```

## Endpoint API Baru:

- `GET /api/users` - Get all users (admin)
- `PUT /api/users/:id/status` - Toggle user status (admin)
- `GET /api/reports/stats` - Get chart statistics
- `GET /api/reports/:id/export/pdf` - Export single report to PDF
- `GET /api/reports/export/csv` - Export all reports to CSV (with filters)
- `GET /api/reports/admin/all?month=X&year=Y&start_date=X&end_date=Y&jenis_laporan=X` - Get filtered reports

## Login Credentials (untuk Testing):

**Admin:**
- Email: admin@diskominfo.go.id
- Password: admin12345

**User:**
- Email: budi@email.com
- Password: password123

## Notes:
- Pastikan MySQL server running sebelum start aplikasi
- Gunakan .env file untuk konfigurasi database
- Backup database sebelum run migration
