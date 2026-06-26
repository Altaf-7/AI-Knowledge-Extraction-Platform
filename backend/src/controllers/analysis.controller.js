const {analyzeWebsite} = require('../services/analysis.service.js');
const {findByURL,saveAnalysis} = require('../services/cache.service.js');

const analyzeWebsiteController = async (req,res,next) => {
    const{url} = req.body;

    // call cache-service
    const cache = findByURL(url);
    if(cache){
        return res.json({
            success: true,
            data: {
                ...cache
            },
            message: "Express API cached Response",
            errorCode: null
        });
    }

    // call analyze-service
    try{
        const parsed_result_obj = await analyzeWebsite(url);

        if(parsed_result_obj.success){
            saveAnalysis(url,parsed_result_obj.data);
            const response = {
                success: true,
                data: {
                    ...parsed_result_obj.data,
                    "cached":false
                },
                message: "Express to Fast API Response",
                errorCode: null
            }
            return res.json(response);
        }
        else{
            return next(new Error(parsed_result_obj.message));
        }
    }
    catch(error){
        next(error);
    }
};

module.exports = {
    analyzeWebsiteController
}