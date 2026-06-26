const express = require('express');
const path = require('path');
require('dotenv').config();

const analyzeWebsiteRoutes = require('./src/routes/analysis.routes.js');
const initializeSchema = require('./src/db/schema.js');
const {removeExpiredCache} = require('./src/services/cache.service.js');
const startCacheCleanupJob = require('./src/jobs/cacheCleanup.job.js');
const errorHandler = require('./src/middleware/errorHandler.js');

const app = express();
const PORT = process.env.PORT || 5000;


// Parse JSON
app.use(express.json());


// Static files
app.use(express.static(path.join(__dirname,'../frontend')));


// API Routes
app.use('/api',analyzeWebsiteRoutes);


// Creating Cache Table
initializeSchema();


// Cache Clear Service
removeExpiredCache();


// automatic Clear Service
startCacheCleanupJob();


// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found.",
        errorCode: "ROUTE_NOT_FOUND"
    });
});


// Global Error Handler
app.use(errorHandler);


// Start Server
app.listen(PORT,()=>{
    console.log(`🚀 Server running at http://localhost:${PORT}`)
});