

const generateNewUserID = (UID) => {
  const currentYear=new Date().getFullYear();
  const incriment=parseInt(UID.toString().slice(4))+1;
  let preceeding=String('');
  const reqlength=10-parseInt(incriment.toString().length+4);
  for (let i =0; i<reqlength; i++) {
    preceeding=preceeding+'0';
  }
  // eslint-disable-next-line max-len
  const newUserID=currentYear.toString()+preceeding.toString()+incriment.toString();
  return newUserID;
};

const validatePassword=(newPassword) =>{
  const minNumberofChars = 6;
  const maxNumberofChars = 16;
  const regularExpression = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  if (newPassword?.length < minNumberofChars ||
    newPassword?.length > maxNumberofChars) {
    return false;
  } else if (!regularExpression.test(newPassword)) {
    return false;
  } else {
    return true;
  }
};
module.exports = {
  generateNewUserID,
  validatePassword,
};
