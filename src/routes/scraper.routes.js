const express = require('express');
const router = express.Router();

const {scrapeWebsiteController} = require('../controllers/scraper.controller.js');

// POST /api/extract
router.post('/extract',scrapeWebsiteController);

module.exports = router;