const express = require('express');
const router = express.Router();

const {analyzeWebsiteController} = require('../controllers/analysis.controller.js');

// POST /api/extract
router.post('/analyze',analyzeWebsiteController);

module.exports = router;