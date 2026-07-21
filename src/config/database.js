const mockUsers = [
    { id: 1, name: 'Admin WBS', email: 'admin@diskominfo.go.id', password: '$2a$10$2iLZj9Oxco7YSjssFqMK/./iQ.foeAcSDcNZvFGkB7ioKMk66PgHK', role: 'admin', is_active: 1, created_at: new Date('2026-01-01T08:00:00Z') },
    { id: 2, name: 'Budi Santoso', email: 'budi@email.com', password: '$2a$10$6nh.WvbGpIMJq5KILxfK.e2rHOIsNA8rZwSpAYP3qWXuQwGkGCxtS', role: 'user', is_active: 1, created_at: new Date('2026-01-05T10:00:00Z') }
];

// Generate 45 additional users to reach 47
const firstNames = ['Agus', 'Siti', 'Bambang', 'Rina', 'Joko', 'Dewi', 'Ahmad', 'Sri', 'Hendro', 'Nur', 'Eko', 'Fitri', 'Rudi', 'Wahyu', 'Putri'];
const lastNames = ['Pratama', 'Saputra', 'Kusuma', 'Wijaya', 'Nugroho', 'Lestari', 'Santoso', 'Gunawan', 'Susanti', 'Wahyudi'];

for (let i = 3; i <= 47; i++) {
    const fName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lName = lastNames[Math.floor(Math.random() * lastNames.length)];
    mockUsers.push({
        id: i,
        name: `${fName} ${lName}`,
        email: `user${i}@email.com`,
        password: '$2a$10$6nh.WvbGpIMJq5KILxfK.e2rHOIsNA8rZwSpAYP3qWXuQwGkGCxtS', // password123
        role: 'user',
        is_active: 1,
        created_at: new Date(Date.now() - Math.floor(Math.random() * 10000000000)) // Random date in past
    });
}

// Generate 120 reports
const mockReports = [];
const titlesAduan = ['Pungutan Liar Pembuatan KTP', 'Jalan Berlubang di Pusat Kota', 'Banjir Akibat Saluran Mampet', 'Lampu Jalan Mati Berbulan-bulan', 'Pelayanan Puskesmas Lambat', 'Dugaan Korupsi Dana Desa', 'Tumpukan Sampah Tidak Diambil', 'Pohon Tumbang Membahayakan'];
const titlesSaran = ['Pembuatan Taman Bermain Anak', 'Pemasangan CCTV di Perempatan', 'Aplikasi Pelayanan Online Desa', 'Penghijauan Sepanjang Jalan Raya', 'Penyediaan Tempat Sampah Organik', 'Penyuluhan Kesehatan Rutin'];
const instansis = ['Dinas PUPR', 'Dinas Kesehatan', 'Dinas Pendidikan', 'Dinas Lingkungan Hidup', 'Dinas Perhubungan', 'Inspektorat', 'PDAM', 'Kecamatan', 'Dukcapil'];
const statuses = ['pending', 'pending', 'diterima', 'diproses', 'diproses', 'selesai', 'selesai', 'selesai', 'ditolak'];

for (let i = 1; i <= 120; i++) {
    const isAduan = Math.random() > 0.3; // 70% aduan, 30% saran
    const jenis = isAduan ? 'aduan' : 'saran';
    const titleArr = isAduan ? titlesAduan : titlesSaran;
    
    // Generate random date within the last 6 months
    const dateObj = new Date(Date.now() - Math.floor(Math.random() * 15552000000));
    const dateStr = dateObj.toISOString().split('T')[0];

    mockReports.push({
        id: i,
        title: titleArr[Math.floor(Math.random() * titleArr.length)] + ` (Laporan #${i})`,
        description: `Ini adalah deskripsi detail untuk laporan nomor ${i}. Terdapat indikasi perlunya perbaikan atau tindak lanjut segera dari pihak terkait mengenai masalah ini.`,
        date: dateStr,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        user_id: Math.floor(Math.random() * 46) + 2, // User ID 2 to 47
        jenis_laporan: jenis,
        instansi_tujuan: instansis[Math.floor(Math.random() * instansis.length)],
        lokasi_kejadian: `Wilayah Sektor ${Math.floor(Math.random() * 10) + 1}`,
        file_path: null,
        created_at: dateObj
    });
}

// Sort reports descending by created_at
mockReports.sort((a, b) => b.created_at - a.created_at);

const mockDb = {
    query: async (sql, params = []) => {
        const sqlLower = sql.toLowerCase();
        
        // AUTH & USERS
        if (sqlLower.includes('select * from users where email')) {
            const user = mockUsers.find(u => u.email === params[0]);
            return [user ? [user] : []];
        }
        if (sqlLower.includes('insert into users')) {
            const newUser = { id: mockUsers.length + 1, name: params[0], email: params[1], password: params[2], role: params[3], is_active: 1, created_at: new Date() };
            mockUsers.push(newUser);
            return [{ insertId: newUser.id }];
        }
        if (sqlLower.includes('select id, name, email, role, created_at from users where id')) {
            const user = mockUsers.find(u => u.id === params[0]);
            return [user ? [user] : []];
        }
        
        // GET ALL USERS (Admin)
        if (sqlLower.includes('from users where role = "user"')) {
            let filteredUsers = mockUsers.filter(u => u.role === 'user');
            filteredUsers.sort((a, b) => b.created_at - a.created_at);
            return [filteredUsers];
        }

        // TOGGLE USER STATUS
        if (sqlLower.includes('update users set is_active')) {
            const user = mockUsers.find(u => u.id === params[1]);
            if (user) {
                user.is_active = params[0];
                return [{ affectedRows: 1 }];
            }
            return [{ affectedRows: 0 }];
        }
        
        // GET USER ROLE
        if (sqlLower.includes('select role from users where id')) {
            const user = mockUsers.find(u => u.id === params[0]);
            return [user ? [user] : []];
        }

        // REPORTS
        if (sqlLower.includes('insert into reports')) {
            let newReport;
            if (params.length === 9) { 
                 newReport = { id: mockReports.length + 1, title: params[0], description: params[1], date: params[2], jenis_laporan: params[3], instansi_tujuan: params[4], lokasi_kejadian: params[5], file_path: params[6], user_id: params[7], status: params[8], created_at: new Date() };
            } else {
                 newReport = { id: mockReports.length + 1, title: params[0], description: params[1], date: params[2], status: params[3], user_id: params[4], created_at: new Date() };
            }
            mockReports.unshift(newReport);
            return [{ insertId: newReport.id }];
        }
        
        if (sqlLower.includes('select r.*, u.name as user_name, u.email as user_email from reports r join users u')) {
            let resReports = mockReports.map(r => {
                const u = mockUsers.find(user => user.id === r.user_id) || {};
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
            let resReports = mockReports.filter(r => r.user_id == params[0]);
            resReports.sort((a, b) => b.created_at - a.created_at);
            return [resReports];
        }

        if (sqlLower.includes('update reports set status')) {
            const report = mockReports.find(r => r.id == params[1]);
            if (report) {
                report.status = params[0];
                return [{ affectedRows: 1 }];
            }
            return [{ affectedRows: 0 }];
        }

        // STATS
        if (sqlLower.includes('select count(*) as count from reports')) {
            if (sqlLower.includes('where status = "pending"')) return [[{ count: mockReports.filter(r => r.status === 'pending').length }]];
            if (sqlLower.includes('where status = "diproses"')) return [[{ count: mockReports.filter(r => r.status === 'diproses').length }]];
            if (sqlLower.includes('where status = "selesai"')) return [[{ count: mockReports.filter(r => r.status === 'selesai').length }]];
            return [[{ count: mockReports.length }]];
        }
        if (sqlLower.includes('select count(*) as count from users')) {
            return [[{ count: mockUsers.filter(u => u.role === 'user').length }]];
        }
        
        if (sqlLower.includes('group by jenis_laporan')) {
            const byJenis = [
                { jenis_laporan: 'aduan', total: mockReports.filter(r => (r.jenis_laporan||'aduan') === 'aduan').length, count: mockReports.filter(r => (r.jenis_laporan||'aduan') === 'aduan').length },
                { jenis_laporan: 'saran', total: mockReports.filter(r => r.jenis_laporan === 'saran').length, count: mockReports.filter(r => r.jenis_laporan === 'saran').length }
            ];
            return [byJenis.filter(j => j.total > 0)];
        }
        
        if (sqlLower.includes('group by status')) {
            const statuses = ['pending', 'diterima', 'diproses', 'selesai', 'ditolak'];
            const byStatus = statuses.map(s => ({ status: s, total: mockReports.filter(r => r.status === s).length, count: mockReports.filter(r => r.status === s).length }));
            return [byStatus.filter(s => s.total > 0)];
        }

        console.log('Unmocked query fallback:', sql);
        return [[]];
    }
};

module.exports = mockDb;
