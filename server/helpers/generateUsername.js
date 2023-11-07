/**
 * Generate username based on email, or name
 *
 * @param {string} email
 * @param {string} firstName
 * @param {string} lastName
 *
 * @returns {string} The randomly generated username
 */
const generateUsername = (email, firstName, lastName, id) => {
    let username = "";

    if (email) {
        username = email.split("@")[0];
    } else if (firstName && lastName) {
        username = `${firstName}${lastName}${generateRandomNumber()}`;
    } else if (id) {
        username = id;
    }

    return username.toLowerCase();
};

module.exports = generateUsername;
