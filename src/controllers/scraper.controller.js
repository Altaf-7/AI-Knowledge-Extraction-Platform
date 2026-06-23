const {scrapeWebsite} = require('../services/scraper.service.js');

const scrapeWebsiteController = async (req,res) => {
    try{
        const{url} = req.body;

        const result = await scrapeWebsite(url);
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
    scrapeWebsiteController
}