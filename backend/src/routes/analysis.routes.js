const express = require('express');
const router = express.Router();

const {analyzeWebsiteController} = require('../controllers/analysis.controller.js');
const validateAnalyzeRequest = require('../middleware/validator.js');

// POST /api/extract
router.post(
    '/analyze',
    validateAnalyzeRequest,
    analyzeWebsiteController);

module.exports = router;