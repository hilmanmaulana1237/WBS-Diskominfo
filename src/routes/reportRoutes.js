const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const reportController = require('../controllers/reportController');
const exportController = require('../controllers/exportController');
const { auth, isAdmin } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Validation rules
const reportValidation = [
    body('title').trim().notEmpty().withMessage('Judul harus diisi'),
    body('description').trim().notEmpty().withMessage('Deskripsi harus diisi'),
    body('date').isDate().withMessage('Tanggal tidak valid'),
    body('jenis_laporan').isIn(['saran', 'aduan']).withMessage('Jenis laporan harus "saran" atau "aduan"'),
    body('instansi_tujuan').trim().notEmpty().withMessage('Instansi tujuan harus diisi'),
    body('lokasi_kejadian').trim().notEmpty().withMessage('Lokasi kejadian harus diisi')
];

// Public routes (no auth required - for index page)
router.get('/public/stats', reportController.getPublicStats);
router.get('/public/charts', reportController.getPublicCharts);

// Protected public routes (harus di atas route dengan params)
router.get('/stats', auth, isAdmin, reportController.getDashboardStats);
router.get('/charts', auth, isAdmin, reportController.getDashboardCharts);

// User routes
router.post('/', auth, upload.single('file'), reportValidation, reportController.createReport);
router.get('/my-reports', auth, reportController.getUserReports);
router.get('/:id', auth, reportController.getReportDetail);

// Admin routes
router.get('/admin/all', auth, isAdmin, reportController.getAllReports);
router.get('/admin/:id', auth, isAdmin, reportController.getReportDetailAdmin);
router.put('/admin/:id/status', auth, isAdmin, reportController.updateReportStatus);
router.get('/admin/statistics/data', auth, isAdmin, reportController.getStatistics);

// Export routes
router.get('/:id/export/pdf', auth, exportController.exportReportPDF);
router.get('/export/csv', auth, isAdmin, exportController.exportReportsCSV);

module.exports = router;
