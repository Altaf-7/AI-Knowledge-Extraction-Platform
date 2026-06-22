const express = require('express');
const path = require('path');
require('dotenv').config();

const scraperRoutes = require('./src/routes/scraper.routes.js');

const app = express();
const PORT = process.env.PORT || 5000;


// Middleware
app.use(express.json());


// Static files
app.use(express.static(path.join(__dirname,'public')));


// API Routes
app.use('/api',scraperRoutes);


// Start Server
app.listen(PORT,()=>{
    console.log(`🚀 Server running at http://localhost:${PORT}`)
});