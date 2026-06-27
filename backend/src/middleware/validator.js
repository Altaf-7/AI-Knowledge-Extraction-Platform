const validateAnalyzeRequest = (req, res, next) => {

    const { url } = req.body;

    // Check if URL exists
    if (!url) {
        return res.status(400).json({
            success: false,
            data:null,
            message: "URL is required.",
            errorCode: "URL_REQUIRED"
        });
    }

    // Check datatype
    if (typeof url !== "string") {
        return res.status(400).json({
            success: false,
            data:null,
            message: "URL must be a string.",
            errorCode: "INVALID_URL_TYPE"
        });
    }

    const trimmedURL = url.trim();

    // Empty string
    if (trimmedURL.length === 0) {
        return res.status(400).json({
            success: false,
            data:null,
            message: "URL cannot be empty.",
            errorCode: "EMPTY_URL"
        });
    }

    // Length restriction
    if (trimmedURL.length > 2048) {
        return res.status(400).json({
            success: false,
            data:null,
            message: "URL is too long.",
            errorCode: "URL_TOO_LONG"
        });
    }

    try {

        const parsedURL = new URL(trimmedURL);

        if (
            parsedURL.protocol !== "http:" &&
            parsedURL.protocol !== "https:"
        ) {
            return res.status(400).json({
                success: false,
                data:null,
                message: "Only HTTP and HTTPS URLs are supported.",
                errorCode: "INVALID_PROTOCOL"
            });
        }

    } catch {

        return res.status(400).json({
            success: false,
            data:null,
            message: "Invalid URL.",
            errorCode: "INVALID_URL"
        });

    }

    // Save cleaned value
    req.body.url = trimmedURL;

    next();
};

module.exports = validateAnalyzeRequest;