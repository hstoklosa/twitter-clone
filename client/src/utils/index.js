export const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

export const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const generateOptions = (start, end) => {
    const options = [];

    for (let i = start; i <= end; i++) {
        options.push(i);
    }

    return options;
};

export const days = generateOptions(1, 31);
export const years = generateOptions(1900, new Date().getFullYear());

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
        console.error(err.message);
        return err;
    }
};
