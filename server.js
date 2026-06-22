const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Static files
app.use(express.static(path.join(__dirname,'public')));

// Start Server
app.listen(PORT,()=>{
    console.log(`🚀 Server running at http://localhost:${PORT}`)
});