const {removeExpiredCache} = require('../services/cache.service.js');

const startCacheCleanupJob = () =>{
    const CACHE_CLEANUP_INTERVAL_HOURS = Number(process.env.CACHE_CLEANUP_INTERVAL_HOURS);
    
    setInterval(() => {
        removeExpiredCache(CACHE_CLEANUP_INTERVAL_HOURS,'hours');
    },CACHE_CLEANUP_INTERVAL_HOURS*60*60*1000);
}

module.exports = startCacheCleanupJob;