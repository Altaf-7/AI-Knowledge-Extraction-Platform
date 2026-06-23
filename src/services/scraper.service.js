const axios = require('axios');

const scrapeWebsite = async (url) => {
    const payload = {
        url: url,
    }

    const response = await axios.post(
        `${process.env.FASTAPI_URL}/scrape`,
        payload
    );
    return response.data;
};

module.exports = {
    scrapeWebsite
}