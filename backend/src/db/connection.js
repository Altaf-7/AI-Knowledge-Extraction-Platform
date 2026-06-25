const Database = require('better-sqlite3');

const db = new Database('./storage/extractor.db');

module.exports = db;