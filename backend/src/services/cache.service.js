const db = require('../db/connection.js');

const findByURL = (url) => {
    const row = db.prepare(`
        SELECT *
        FROM analysis_cache
        WHERE url=?
    `).get(url);

    if(row){
        let {response_json} = row;
        parsed_response = JSON.parse(response_json);
        return {
            ...parsed_response,
            "cache":true
        }
    }
    return null;
};

const saveAnalysis = (url,result) => {
    db.prepare(`
        INSERT INTO analysis_cache (url,title,response_json)
        VALUES (?,?,?)
    `).run(url,result["title"],JSON.stringify(result));
};

const removeExpiredCache = (
    value=Number(process.env.CACHE_TTL_DAYS),
    unit='days'
) => {

    const expirationModifier = `-${value} ${unit}`;

    const result = db.prepare(`
        DELETE FROM analysis_cache 
        WHERE created_at < datetime('now', ?)
    `).run(expirationModifier);

    return result.changes;
};

const clearAllCache = () => {
    db.exec('DELETE FROM analysis_cache;');
    db.exec('VACUUM;'); // Shrinks the database file size on disk
};

module.exports = {
    findByURL,
    saveAnalysis,
    removeExpiredCache,
    clearAllCache
}