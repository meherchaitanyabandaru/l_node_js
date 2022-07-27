const md5 = require('md5');

/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const encryptPlainText =  (inputPlainText) => {
  return md5(inputPlainText)
};

/**
 * Logout
 * @param {string} refreshToken
 * @returns {Promise}
 */
const testmethod =  () => {
  return "testsuccessful"
};

module.exports = {
  encryptPlainText,
  testmethod,
};