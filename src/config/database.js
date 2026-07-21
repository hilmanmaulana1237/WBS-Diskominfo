let users = [
    { id: 1, name: 'Admin WBS', email: 'admin@diskominfo.go.id', password: '$2a$10$2iLZj9Oxco7YSjssFqMK/./iQ.foeAcSDcNZvFGkB7ioKMk66PgHK', role: 'admin', is_active: 1, created_at: new Date('2026-01-01T08:00:00Z') },
    { id: 2, name: 'Budi Santoso', email: 'budi@email.com', password: '$2a$10$6nh.WvbGpIMJq5KILxfK.e2rHOIsNA8rZwSpAYP3qWXuQwGkGCxtS', role: 'user', is_active: 1, created_at: new Date('2026-01-05T10:00:00Z') },
    { id: 3, name: 'Siti Aminah', email: 'siti@email.com', password: '$2a$10$6nh.WvbGpIMJq5KILxfK.e2rHOIsNA8rZwSpAYP3qWXuQwGkGCxtS', role: 'user', is_active: 1, created_at: new Date('2026-02-10T09:15:00Z') },
    { id: 4, name: 'Agus Salim', email: 'agus@email.com', password: '$2a$10$6nh.WvbGpIMJq5KILxfK.e2rHOIsNA8rZwSpAYP3qWXuQwGkGCxtS', role: 'user', is_active: 1, created_at: new Date('2026-03-20T14:30:00Z') },
    { id: 5, name: 'Rina Melati', email: 'rina@email.com', password: '$2a$10$6nh.WvbGpIMJq5KILxfK.e2rHOIsNA8rZwSpAYP3qWXuQwGkGCxtS', role: 'user', is_active: 1, created_at: new Date('2026-04-11T11:45:00Z') },
    { id: 6, name: 'Joko Prabowo', email: 'joko@email.com', password: '$2a$10$6nh.WvbGpIMJq5KILxfK.e2rHOIsNA8rZwSpAYP3qWXuQwGkGCxtS', role: 'user', is_active: 1, created_at: new Date('2026-05-05T08:20:00Z') }
];

let reports = [
    { id: 1, title: 'Dugaan Korupsi Proyek Gor', description: 'Terdapat indikasi mark-up anggaran pada pengadaan bahan bangunan untuk proyek GOR baru.', date: '2026-06-10', status: 'selesai', user_id: 2, jenis_laporan: 'aduan', instansi_tujuan: 'Dinas Pemuda dan Olahraga', lokasi_kejadian: 'Proyek GOR Pusat', file_path: null, created_at: new Date('2026-06-10T10:00:00Z') },
    { id: 2, title: 'Pelayanan Puskesmas Indah Sangat Lambat', description: 'Petugas loket sering kosong pada jam kerja, antrean dibiarkan menumpuk hingga 3 jam.', date: '2026-07-01', status: 'diproses', user_id: 3, jenis_laporan: 'aduan', instansi_tujuan: 'Dinas Kesehatan', lokasi_kejadian: 'Puskesmas Indah', file_path: null, created_at: new Date('2026-07-01T08:30:00Z') },
    { id: 3, title: 'Saran Perbaikan Jalan Rusak', description: 'Jalan di depan pasar induk berlubang cukup dalam, mohon segera ditambal agar tidak membahayakan.', date: '2026-07-15', status: 'diterima', user_id: 4, jenis_laporan: 'saran', instansi_tujuan: 'Dinas PUPR', lokasi_kejadian: 'Jalan Pasar Induk', file_path: null, created_at: new Date('2026-07-15T14:15:00Z') },
    { id: 4, title: 'Pungutan Liar Pembuatan KTP', description: 'Oknum petugas meminta biaya Rp 50.000 untuk mempercepat proses cetak KTP elektronik.', date: '2026-07-18', status: 'pending', user_id: 5, jenis_laporan: 'aduan', instansi_tujuan: 'Dinas Dukcapil', lokasi_kejadian: 'Kantor Kecamatan Selatan', file_path: null, created_at: new Date('2026-07-18T09:45:00Z') },
    { id: 5, title: 'Usulan Penambahan Lampu Jalan', description: 'Kawasan industri sering gelap gulita di malam hari, rawan pembegalan. Mohon tambah PJU.', date: '2026-05-20', status: 'ditolak', user_id: 6, jenis_laporan: 'saran', instansi_tujuan: 'Dinas Perhubungan', lokasi_kejadian: 'Kawasan Industri Ring Road', file_path: null, created_at: new Date('2026-05-20T19:30:00Z') },
    { id: 6, title: 'Pegawai Kelurahan Tidak Disiplin', description: 'Banyak pegawai yang baru datang jam 10 pagi padahal jam pelayanan dimulai jam 8 pagi.', date: '2026-07-05', status: 'diproses', user_id: 2, jenis_laporan: 'aduan', instansi_tujuan: 'Inspektorat', lokasi_kejadian: 'Kelurahan Makmur', file_path: null, created_at: new Date('2026-07-05T11:00:00Z') },
    { id: 7, title: 'Pembuatan Taman Ramah Anak', description: 'Kami menyarankan area lahan kosong di RW 04 diubah menjadi taman bermain anak yang aman.', date: '2026-06-25', status: 'selesai', user_id: 3, jenis_laporan: 'saran', instansi_tujuan: 'Dinas Lingkungan Hidup', lokasi_kejadian: 'Lahan RW 04', file_path: null, created_at: new Date('2026-06-25T16:20:00Z') },
    { id: 8, title: 'Pengadaan Laptop Fiktif', description: 'Data aset mencantumkan pembelian 20 laptop baru, namun barangnya tidak pernah ada di kantor.', date: '2026-07-19', status: 'pending', user_id: 4, jenis_laporan: 'aduan', instansi_tujuan: 'Inspektorat Daerah', lokasi_kejadian: 'Kantor Dinas Pendidikan', file_path: null, created_at: new Date('2026-07-19T08:10:00Z') },
    { id: 9, title: 'Pipa PDAM Bocor Menyebabkan Banjir', description: 'Pipa air bersih utama pecah dan menggenangi jalan raya sejak semalaman.', date: '2026-07-20', status: 'diterima', user_id: 5, jenis_laporan: 'aduan', instansi_tujuan: 'PDAM', lokasi_kejadian: 'Perempatan Sudirman', file_path: null, created_at: new Date('2026-07-20T07:45:00Z') },
    { id: 10, title: 'Ide Pembuatan Aplikasi Layanan Desa', description: 'Alangkah baiknya ada aplikasi khusus untuk mengurus surat pengantar RT/RW secara online.', date: '2026-07-21', status: 'pending', user_id: 6, jenis_laporan: 'saran', instansi_tujuan: 'Dinas Kominfo', lokasi_kejadian: 'Desa Maju', file_path: null, created_at: new Date('2026-07-21T10:05:00Z') }
];

const mockDb = {
    query: async (sql, params = []) => {
        const sqlLower = sql.toLowerCase();
        
        // AUTH & USERS
        if (sqlLower.includes('select * from users where email')) {
            const user = users.find(u => u.email === params[0]);
            return [user ? [user] : []];
        }
        if (sqlLower.includes('insert into users')) {
            const newUser = { id: users.length + 1, name: params[0], email: params[1], password: params[2], role: params[3], is_active: 1, created_at: new Date() };
            users.push(newUser);
            return [{ insertId: newUser.id }];
        }
        if (sqlLower.includes('select id, name, email, role, created_at from users where id')) {
            const user = users.find(u => u.id === params[0]);
            return [user ? [user] : []];
        }

        // REPORTS
        if (sqlLower.includes('insert into reports')) {
            let newReport;
            if (params.length === 9) { 
                 newReport = { id: reports.length + 1, title: params[0], description: params[1], date: params[2], jenis_laporan: params[3], instansi_tujuan: params[4], lokasi_kejadian: params[5], file_path: params[6], user_id: params[7], status: params[8], created_at: new Date() };
            } else {
                 newReport = { id: reports.length + 1, title: params[0], description: params[1], date: params[2], status: params[3], user_id: params[4], created_at: new Date() };
            }
            reports.push(newReport);
            return [{ insertId: newReport.id }];
        }
        
        if (sqlLower.includes('select r.*, u.name as user_name, u.email as user_email from reports r join users u')) {
            let resReports = reports.map(r => {
                const u = users.find(user => user.id === r.user_id) || {};
                return { ...r, user_name: u.name, user_email: u.email };
            });
            
            if (sqlLower.includes('where r.id = ? and r.user_id = ?')) {
                resReports = resReports.filter(r => r.id == params[0] && r.user_id == params[1]);
            } else if (sqlLower.includes('where r.id = ?')) {
                resReports = resReports.filter(r => r.id == params[0]);
            }
            resReports.sort((a, b) => b.created_at - a.created_at);
            return [resReports];
        }

        if (sqlLower.includes('select * from reports where user_id')) {
            let resReports = reports.filter(r => r.user_id == params[0]);
            resReports.sort((a, b) => b.created_at - a.created_at);
            return [resReports];
        }

        if (sqlLower.includes('update reports set status')) {
            const report = reports.find(r => r.id == params[1]);
            if (report) {
                report.status = params[0];
                return [{ affectedRows: 1 }];
            }
            return [{ affectedRows: 0 }];
        }

        // STATS
        if (sqlLower.includes('select count(*) as count from reports')) {
            if (sqlLower.includes('where status = "pending"')) return [[{ count: reports.filter(r => r.status === 'pending').length }]];
            if (sqlLower.includes('where status = "diproses"')) return [[{ count: reports.filter(r => r.status === 'diproses').length }]];
            if (sqlLower.includes('where status = "selesai"')) return [[{ count: reports.filter(r => r.status === 'selesai').length }]];
            return [[{ count: reports.length }]];
        }
        if (sqlLower.includes('select count(*) as count from users')) {
            return [[{ count: users.filter(u => u.role === 'user').length }]];
        }
        
        if (sqlLower.includes('group by jenis_laporan')) {
            const byJenis = [
                { jenis_laporan: 'aduan', total: reports.filter(r => (r.jenis_laporan||'aduan') === 'aduan').length, count: reports.filter(r => (r.jenis_laporan||'aduan') === 'aduan').length },
                { jenis_laporan: 'saran', total: reports.filter(r => r.jenis_laporan === 'saran').length, count: reports.filter(r => r.jenis_laporan === 'saran').length }
            ];
            return [byJenis.filter(j => j.total > 0)];
        }
        
        if (sqlLower.includes('group by status')) {
            const statuses = ['pending', 'diterima', 'diproses', 'selesai', 'ditolak'];
            const byStatus = statuses.map(s => ({ status: s, total: reports.filter(r => r.status === s).length, count: reports.filter(r => r.status === s).length }));
            return [byStatus.filter(s => s.total > 0)];
        }

        console.log('Unmocked query fallback:', sql);
        return [[]];
    }
};

module.exports = mockDb;
