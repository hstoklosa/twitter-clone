export const sendRequest = async (url, method = "GET", body = null, headers = {}) => {
    try {
        const options = {
            method: method,
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
                ...headers,
            },
        };

        if (body && method !== "GET" && method !== "HEAD") {
            options.body = JSON.stringify(body);
        }

        const response = await fetch(url, options);

        return response.json(); // parses JSON response into native JavaScript objects
    } catch (err) {
        console.error(err);
        return null;
    }
};
