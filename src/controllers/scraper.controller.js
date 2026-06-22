const {scrapeWebsite} = require('../services/scraper.service.js');

const scrapeWebsiteController = (req,res) => {
    const result = scrapeWebsite();
    res.json(result);
};

module.exports = {
    scrapeWebsiteController
}