const {analyzeWebsite} = require('../services/analysis.service.js');

const analyzeWebsiteController = async (req,res) => {
    try{
        const{url} = req.body;

        const result = await analyzeWebsite(url);
        return res.json(result);
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