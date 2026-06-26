const validateURL = (url) => {
    // Check if URL exists
    if (!url || url.trim() === "") {
        return {
            valid: false,
            message: "URL cannot be empty."
        };
    }

    try {
        const parsedURL = new URL(url.trim());

        if (
            parsedURL.protocol !== "http:" &&
            parsedURL.protocol !== "https:"
        ) {
            return {
                valid: false,
                message: "Only HTTP and HTTPS URLs are supported."
            };
        }
    }
    catch {
        return {
            valid: false,
            message: "Invalid URL.<br> (provide Proper HTTP or HTTPS URLs)"
        };
    }

    return {
        valid: true
    };
}