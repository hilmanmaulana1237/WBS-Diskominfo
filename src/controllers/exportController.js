const PDFDocument = require('pdfkit');
const { Parser } = require('json2csv');
const db = require('../config/database');
const fs = require('fs');
const path = require('path');

// Export single report to PDF
exports.exportReportPDF = async (req, res) => {
    try {
        const { id } = req.params;
        
        console.log('Exporting PDF for report ID:', id);
        console.log('User role:', req.user?.role);
        
        // Get report data
        const [reports] = await db.query(
            'SELECT r.*, u.name as user_name, u.email as user_email FROM reports r JOIN users u ON r.user_id = u.id WHERE r.id = ?',
            [id]
        );

        if (reports.length === 0) {
            return res.status(404).json({ error: 'Laporan tidak ditemukan' });
        }

        const report = reports[0];
        console.log('Report found:', report.title);

        // Create PDF document
        const doc = new PDFDocument({ 
            margin: 50,
            size: 'A4'
        });
        
        // Set response headers
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=laporan-${report.id}.pdf`);
        
        // Pipe PDF to response
        doc.pipe(res);

        // === HEADER / KOP SURAT ===
        const logoPath = path.join(__dirname, '../../public/assets/logo.jpg');
        
        // Logo
        if (fs.existsSync(logoPath)) {
            doc.image(logoPath, 50, 45, { width: 60 });
        }
        
        // Teks Kop di samping logo
        doc.fontSize(16)
           .font('Helvetica-Bold')
           .text('WHISTLE BLOWING SYSTEM', 120, 50, { align: 'left' });
        
        doc.fontSize(10)
           .font('Helvetica')
           .text('Dinas Komunikasi dan Informatika', 120, 70, { align: 'left' })
           .text('Kabupaten Cirebon', 120, 84, { align: 'left' });

        // Garis pemisah horizontal
        doc.moveTo(50, 120)
           .lineTo(545, 120)
           .stroke();

        doc.moveDown(3);

        // === JUDUL DOKUMEN ===
        doc.fontSize(16)
           .font('Helvetica-Bold')
           .text('LAPORAN PENGADUAN', 50, 140, { 
               align: 'center',
               width: 495
           });
        
        doc.moveDown(2);

        // === ISI LAPORAN ===
        const startY = 185;
        let currentY = startY;

        // Function to add field
        const addField = (label, value, yPos) => {
            doc.fontSize(11).font('Helvetica-Bold').text(label, 70, yPos, { width: 150, continued: false });
            doc.fontSize(11).font('Helvetica').text(': ' + value, 220, yPos, { width: 300 });
            return yPos + 20;
        };

        currentY = addField('ID Laporan', `#${report.id}`, currentY);
        currentY = addField('Judul', report.title, currentY);
        currentY = addField('Jenis Laporan', report.jenis_laporan === 'aduan' ? 'Aduan' : 'Saran', currentY);
        currentY = addField('Instansi Tujuan', report.instansi_tujuan || 'Tidak disebutkan', currentY);
        currentY = addField('Lokasi Kejadian', report.lokasi_kejadian || 'Tidak disebutkan', currentY);
        currentY = addField('Tanggal Kejadian', new Date(report.date).toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }), currentY);
        currentY = addField('Status', getStatusLabel(report.status), currentY);

        // Description dengan box
        doc.moveDown(1);
        currentY += 10;
        
        doc.fontSize(11)
           .font('Helvetica-Bold')
           .text('Deskripsi:', 70, currentY);
        
        currentY += 20;
        
        doc.rect(70, currentY, 470, 100)
           .stroke();
        
        doc.fontSize(10)
           .font('Helvetica')
           .text(report.description, 80, currentY + 10, { 
               width: 450,
               align: 'justify'
           });

        currentY += 120;

        // Reporter info (admin only)
        if (req.user.role === 'admin') {
            doc.fontSize(11)
               .font('Helvetica-Bold')
               .text('Informasi Pelapor:', 70, currentY);
            
            currentY += 20;
            currentY = addField('Nama', report.user_name, currentY);
            currentY = addField('Email', report.user_email, currentY);
        }

        // === FOOTER ===
        const now = new Date();
        const printDate = now.toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        const printTime = now.toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });

        doc.fontSize(9)
           .font('Helvetica-Oblique')
           .text(`Dicetak pada: ${printDate} pukul ${printTime}`, 50, 750, { 
               align: 'center',
               width: 495
           });

        // Finalize PDF
        doc.end();

    } catch (error) {
        console.error('Export PDF error:', error);
        res.status(500).json({ error: 'Gagal mengexport PDF' });
    }
};

// Export all reports to CSV
exports.exportReportsCSV = async (req, res) => {
    try {
        console.log('Exporting CSV...');
        console.log('User role:', req.user?.role);
        console.log('Query params:', req.query);
        
        // Filter parameters (same as getAllReports)
        const { month, year, start_date, end_date, jenis_laporan, status } = req.query;
        
        let query = 'SELECT r.*, u.name as user_name, u.email as user_email FROM reports r JOIN users u ON r.user_id = u.id WHERE 1=1';
        const params = [];

        // Apply filters
        if (month && year) {
            query += ' AND MONTH(r.date) = ? AND YEAR(r.date) = ?';
            params.push(month, year);
        }

        if (start_date && end_date) {
            query += ' AND r.date BETWEEN ? AND ?';
            params.push(start_date, end_date);
        }

        if (jenis_laporan && ['saran', 'aduan'].includes(jenis_laporan)) {
            query += ' AND r.jenis_laporan = ?';
            params.push(jenis_laporan);
        }

        if (status) {
            query += ' AND r.status = ?';
            params.push(status);
        }

        query += ' ORDER BY r.created_at DESC';

        const [reports] = await db.query(query, params);

        if (reports.length === 0) {
            return res.status(404).json({ error: 'Tidak ada laporan untuk diexport' });
        }

        // Prepare data for CSV
        const csvData = reports.map(report => ({
            ID: report.id,
            Judul: report.title,
            'Jenis Laporan': report.jenis_laporan === 'aduan' ? 'Aduan' : 'Saran',
            'Instansi Tujuan': report.instansi_tujuan || '',
            'Lokasi Kejadian': report.lokasi_kejadian || '',
            Deskripsi: report.description,
            'Tanggal Kejadian': new Date(report.date).toLocaleDateString('id-ID'),
            Status: getStatusLabel(report.status),
            'Nama Pelapor': report.user_name,
            'Email Pelapor': report.user_email,
            'Tanggal Dibuat': new Date(report.created_at).toLocaleDateString('id-ID')
        }));

        // Convert to CSV
        const parser = new Parser();
        const csv = parser.parse(csvData);

        // Set response headers
        res.setHeader('Content-Type', 'text/csv; charset=utf-8');
        res.setHeader('Content-Disposition', `attachment; filename=laporan-${Date.now()}.csv`);
        
        // Add BOM for Excel UTF-8 support
        res.write('\uFEFF');
        res.end(csv);

    } catch (error) {
        console.error('Export CSV error:', error);
        res.status(500).json({ error: 'Gagal mengexport CSV' });
    }
};

// Helper function to get status label
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

module.exports = exports;
