const express = require('express');
const path = require('path');
require('dotenv').config();

const analyzeWebsiteRoutes = require('./src/routes/analysis.routes.js');
const initializeSchema = require('./src/db/schema.js');
const {removeExpiredCache} = require('./src/services/cache.service.js');
const startCacheCleanupJob = require('./src/jobs/cacheCleanup.job.js');

const app = express();
const PORT = process.env.PORT || 5000;


// Middleware
app.use(express.json());


// Static files
app.use(express.static(path.join(__dirname,'public')));


// API Routes
app.use('/api',analyzeWebsiteRoutes);

// Creating Cache Table
initializeSchema();

// Cache Clear Service
removeExpiredCache();

// automatic Clear Service
startCacheCleanupJob();

// Start Server
app.listen(PORT,()=>{
    console.log(`🚀 Server running at http://localhost:${PORT}`)
});