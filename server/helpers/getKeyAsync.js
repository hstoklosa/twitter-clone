const { promisify } = require('util');
const randomBytesAsync = promisify(require('crypto').randomBytes);

const getKeyAsync = (size) => {
    return randomBytesAsync(size);
}

module.exports = getKeyAsync;