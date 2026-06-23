const axios = require('axios');

const analyzeWebsite = async (url) => {
    const payload = {
        url: url,
    }

    const response = await axios.post(
        `${process.env.FASTAPI_URL}/analyze`,
        payload
    );
    return response.data;
};

module.exports = {
    analyzeWebsite
}