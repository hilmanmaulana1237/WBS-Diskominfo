const { validationResult } = require('express-validator');
const db = require('../config/database');

// Create report
exports.createReport = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, description, date, jenis_laporan, instansi_tujuan, lokasi_kejadian } = req.body;
        const file_path = req.file ? req.file.path : null;
        const user_id = req.user.id;

        // Validasi field baru
        if (!jenis_laporan || !['saran', 'aduan'].includes(jenis_laporan)) {
            return res.status(400).json({ error: 'Jenis laporan harus "saran" atau "aduan"' });
        }

        if (!instansi_tujuan || instansi_tujuan.trim() === '') {
            return res.status(400).json({ error: 'Instansi tujuan harus diisi' });
        }

        if (!lokasi_kejadian || lokasi_kejadian.trim() === '') {
            return res.status(400).json({ error: 'Lokasi kejadian harus diisi' });
        }

        const [result] = await db.query(
            'INSERT INTO reports (title, description, date, jenis_laporan, instansi_tujuan, lokasi_kejadian, file_path, user_id, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [title, description, date, jenis_laporan, instansi_tujuan, lokasi_kejadian, file_path, user_id, 'pending']
        );

        res.status(201).json({
            message: 'Laporan berhasil dibuat',
            reportId: result.insertId
        });
    } catch (error) {
        console.error('Create report error:', error);
        res.status(500).json({ error: 'Terjadi kesalahan pada server' });
    }
};

// Get user's reports
exports.getUserReports = async (req, res) => {
    try {
        const [reports] = await db.query(
            'SELECT * FROM reports WHERE user_id = ? ORDER BY created_at DESC',
            [req.user.id]
        );

        res.json({ reports });
    } catch (error) {
        console.error('Get user reports error:', error);
        res.status(500).json({ error: 'Terjadi kesalahan pada server' });
    }
};

// Get report detail
exports.getReportDetail = async (req, res) => {
    try {
        const { id } = req.params;
        const [reports] = await db.query(
            'SELECT r.*, u.name as user_name, u.email as user_email FROM reports r JOIN users u ON r.user_id = u.id WHERE r.id = ? AND r.user_id = ?',
            [id, req.user.id]
        );

        if (reports.length === 0) {
            return res.status(404).json({ error: 'Laporan tidak ditemukan' });
        }

        res.json({ report: reports[0] });
    } catch (error) {
        console.error('Get report detail error:', error);
        res.status(500).json({ error: 'Terjadi kesalahan pada server' });
    }
};

// Get all reports (Admin only)
exports.getAllReports = async (req, res) => {
    try {
        // Filter parameters
        const { month, year, start_date, end_date, jenis_laporan, status } = req.query;
        
        let query = 'SELECT r.*, u.name as user_name, u.email as user_email FROM reports r JOIN users u ON r.user_id = u.id WHERE 1=1';
        const params = [];

        // Filter by month and year
        if (month && year) {
            query += ' AND MONTH(r.date) = ? AND YEAR(r.date) = ?';
            params.push(month, year);
        }

        // Filter by date range
        if (start_date && end_date) {
            query += ' AND r.date BETWEEN ? AND ?';
            params.push(start_date, end_date);
        }

        // Filter by jenis laporan
        if (jenis_laporan && ['saran', 'aduan'].includes(jenis_laporan)) {
            query += ' AND r.jenis_laporan = ?';
            params.push(jenis_laporan);
        }

        // Filter by status
        if (status) {
            query += ' AND r.status = ?';
            params.push(status);
        }

        query += ' ORDER BY r.created_at DESC';

        const [reports] = await db.query(query, params);

        res.json({ reports });
    } catch (error) {
        console.error('Get all reports error:', error);
        res.status(500).json({ error: 'Terjadi kesalahan pada server' });
    }
};

// Get report detail (Admin)
exports.getReportDetailAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const [reports] = await db.query(
            'SELECT r.*, u.name as user_name, u.email as user_email FROM reports r JOIN users u ON r.user_id = u.id WHERE r.id = ?',
            [id]
        );

        if (reports.length === 0) {
            return res.status(404).json({ error: 'Laporan tidak ditemukan' });
        }

        res.json({ report: reports[0] });
    } catch (error) {
        console.error('Get report detail admin error:', error);
        res.status(500).json({ error: 'Terjadi kesalahan pada server' });
    }
};

// Update report status (Admin only)
exports.updateReportStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const allowedStatuses = ['pending', 'diterima', 'diproses', 'selesai', 'ditolak'];
        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({ error: 'Status tidak valid' });
        }

        const [result] = await db.query(
            'UPDATE reports SET status = ? WHERE id = ?',
            [status, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Laporan tidak ditemukan' });
        }

        res.json({ message: 'Status laporan berhasil diupdate' });
    } catch (error) {
        console.error('Update report status error:', error);
        res.status(500).json({ error: 'Terjadi kesalahan pada server' });
    }
};

// Get statistics (Admin only)
exports.getStatistics = async (req, res) => {
    try {
        const [totalReports] = await db.query('SELECT COUNT(*) as count FROM reports');
        const [pendingReports] = await db.query('SELECT COUNT(*) as count FROM reports WHERE status = "pending"');
        const [diprosesReports] = await db.query('SELECT COUNT(*) as count FROM reports WHERE status = "diproses"');
        const [selesaiReports] = await db.query('SELECT COUNT(*) as count FROM reports WHERE status = "selesai"');
        const [totalUsers] = await db.query('SELECT COUNT(*) as count FROM users WHERE role = "user"');

        res.json({
            statistics: {
                totalReports: totalReports[0].count,
                pendingReports: pendingReports[0].count,
                diprosesReports: diprosesReports[0].count,
                selesaiReports: selesaiReports[0].count,
                totalUsers: totalUsers[0].count
            }
        });
    } catch (error) {
        console.error('Get statistics error:', error);
        res.status(500).json({ error: 'Terjadi kesalahan pada server' });
    }
};

// Get report statistics for chart
exports.getReportStats = async (req, res) => {
    try {
        console.log('=== Fetching report statistics for chart ===');
        
        // Stats by jenis laporan
        const [byJenis] = await db.query(`
            SELECT 
                COALESCE(jenis_laporan, 'aduan') as jenis_laporan, 
                COUNT(*) as total 
            FROM reports 
            GROUP BY jenis_laporan
        `);

        // Stats by status
        const [byStatus] = await db.query(`
            SELECT 
                status, 
                COUNT(*) as total 
            FROM reports 
            GROUP BY status
        `);

        console.log('Stats by Jenis (raw):', byJenis);
        console.log('Stats by Status (raw):', byStatus);

        // Format response untuk Chart.js
        const response = {
            byType: byJenis.map(item => ({
                label: item.jenis_laporan === 'aduan' ? 'Aduan' : 'Saran',
                value: item.jenis_laporan,
                total: parseInt(item.total) || 0
            })),
            byStatus: byStatus.map(item => ({
                label: getStatusLabel(item.status),
                value: item.status,
                total: parseInt(item.total) || 0
            }))
        };

        console.log('Formatted response:', response);
        res.json(response);
    } catch (error) {
        console.error('Get report stats error:', error);
        res.status(500).json({ 
            error: 'Terjadi kesalahan pada server',
            details: error.message 
        });
    }
};

// Get dashboard stats (untuk admin-dashboard.html)
exports.getDashboardStats = async (req, res) => {
    try {
        const [totalReports] = await db.query('SELECT COUNT(*) as count FROM reports');
        const [pendingReports] = await db.query('SELECT COUNT(*) as count FROM reports WHERE status = "pending"');
        const [diprosesReports] = await db.query('SELECT COUNT(*) as count FROM reports WHERE status = "diproses"');
        const [selesaiReports] = await db.query('SELECT COUNT(*) as count FROM reports WHERE status = "selesai"');

        res.json({
            total: totalReports[0].count,
            pending: pendingReports[0].count,
            diproses: diprosesReports[0].count,
            selesai: selesaiReports[0].count
        });
    } catch (error) {
        console.error('Get dashboard stats error:', error);
        res.status(500).json({ error: 'Terjadi kesalahan pada server' });
    }
};

// Get dashboard charts data (untuk admin-dashboard.html)
exports.getDashboardCharts = async (req, res) => {
    try {
        // Stats by jenis laporan
        const [byJenis] = await db.query(`
            SELECT 
                COALESCE(jenis_laporan, 'aduan') as jenis_laporan, 
                COUNT(*) as count 
            FROM reports 
            GROUP BY jenis_laporan
        `);

        // Stats by status
        const [byStatus] = await db.query(`
            SELECT 
                status, 
                COUNT(*) as count 
            FROM reports 
            GROUP BY status
        `);

        res.json({
            jenis: byJenis,
            status: byStatus
        });
    } catch (error) {
        console.error('Get dashboard charts error:', error);
        res.status(500).json({ error: 'Terjadi kesalahan pada server' });
    }
};

// Get public statistics for index page (no auth required)
exports.getPublicStats = async (req, res) => {
    try {
        // Total reports
        const [totalReports] = await db.query('SELECT COUNT(*) as count FROM reports');
        
        // Resolved reports
        const [resolvedReports] = await db.query('SELECT COUNT(*) as count FROM reports WHERE status = "selesai"');
        
        // Calculate completion rate
        const total = totalReports[0].count;
        const resolved = resolvedReports[0].count;
        const completionRate = total > 0 ? Math.round((resolved / total) * 100) : 0;
        
        res.json({
            total: total,
            resolved: resolved,
            completionRate: completionRate
        });
    } catch (error) {
        console.error('Get public stats error:', error);
        res.status(500).json({ error: 'Terjadi kesalahan pada server' });
    }
};

// Get public charts for index page (no auth required)
exports.getPublicCharts = async (req, res) => {
    try {
        // Status distribution with priority grouping
        const [statusData] = await db.query(`
            SELECT 
                status,
                COUNT(*) as count
            FROM reports 
            GROUP BY status
        `);

        // Jenis laporan distribution
        const [jenisData] = await db.query(`
            SELECT 
                COALESCE(jenis_laporan, 'aduan') as jenis_laporan, 
                COUNT(*) as count 
            FROM reports 
            GROUP BY jenis_laporan
        `);

        // Status mapping for better labels
        const statusMap = {
            'pending': 'Menunggu',
            'diterima': 'Diterima',
            'diproses': 'Diproses',
            'selesai': 'Selesai',
            'ditolak': 'Ditolak'
        };

        // Transform status data with labels
        const transformedStatus = statusData.map(item => ({
            status: item.status,
            label: statusMap[item.status] || item.status,
            count: item.count
        }));

        res.json({
            byStatus: transformedStatus,
            byJenis: jenisData
        });
    } catch (error) {
        console.error('Get public charts error:', error);
        res.status(500).json({ error: 'Terjadi kesalahan pada server' });
    }
};

// Helper function for status label
function getStatusLabel(status) {
    const labels = {
        'pending': 'Menunggu',
        'diterima': 'Diterima',
        'diproses': 'Diproses',
        'selesai': 'Selesai',
        'ditolak': 'Ditolak'
    };
    return labels[status] || status;
}
