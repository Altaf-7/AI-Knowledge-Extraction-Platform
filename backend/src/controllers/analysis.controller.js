const {analyzeWebsite} = require('../services/analysis.service.js');
const {findByURL,saveAnalysis} = require('../services/cache.service.js');

const analyzeWebsiteController = async (req,res) => {
    const{url} = req.body;

    // call cache-service
    const cache = findByURL(url);
    if(cache){
        return res.json(cache);
    }

    // call analyze-service
    try{
        const result = await analyzeWebsite(url);
        saveAnalysis(url,result);
        const response = {
            ...result,
            "cached":false
        }

        return res.json(response);
    }
    catch(error){
        res.status(500).json({
            message: "Failed to extract website.",
            error: error.message
        });
    }
};

module.exports = {
    analyzeWebsiteController
}