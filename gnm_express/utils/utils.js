

const generateNewUserID = (UID) => {
  UID=parseInt(UID.toString().slice(4));
  const incriment=UID+1;
  const currentYear=new Date().getFullYear();
  let preceeding=String('');
  const reqlength=6-UID.toString().length;
  for (let i =0; i<=reqlength; i++) {
    preceeding=preceeding+'0';
  }
  const newUserID=currentYear.toString()+preceeding.toString()+incriment;
  return newUserID;
};

module.exports = {
  generateNewUserID,
};
