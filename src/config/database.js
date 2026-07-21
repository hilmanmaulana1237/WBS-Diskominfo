let users = [
    { id: 1, name: 'Admin WBS', email: 'admin@diskominfo.go.id', password: '$2a$10$2iLZj9Oxco7YSjssFqMK/./iQ.foeAcSDcNZvFGkB7ioKMk66PgHK', role: 'admin', is_active: 1, created_at: new Date() },
    { id: 2, name: 'Budi Santoso', email: 'budi@email.com', password: '$2a$10$rOZ7VH9YYVOVJqxmYWQp/uXNlH9vC5XGJ4YqN6Qd7nqHZBK/Wm8qK', role: 'user', is_active: 1, created_at: new Date() }
];

let reports = [
    { id: 1, title: 'Dugaan Penyalahgunaan', description: 'Indikasi penyalahgunaan.', date: '2026-01-15', status: 'diproses', user_id: 2, jenis_laporan: 'aduan', instansi_tujuan: 'Dinas', lokasi_kejadian: 'Kantor', file_path: null, created_at: new Date() }
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
