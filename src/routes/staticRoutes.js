const express = require('express');
const router = express.Router();
const path = require('path');

// Serve Bootstrap CSS
router.use('/bootstrap/css', express.static(path.join(__dirname, '../../node_modules/bootstrap/dist/css')));

// Serve Bootstrap JS
router.use('/bootstrap/js', express.static(path.join(__dirname, '../../node_modules/bootstrap/dist/js')));

// Serve Bootstrap Icons
router.use('/bootstrap-icons', express.static(path.join(__dirname, '../../node_modules/bootstrap-icons/font')));

module.exports = router;
