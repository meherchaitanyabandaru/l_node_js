const md5 = require('md5');


const encryptPlainText = (inputPlainText) => {
  return md5(inputPlainText);
};


const testmethod = () => {
  return 'testsuccessful';
};

module.exports = {
  encryptPlainText,
  testmethod,
};
