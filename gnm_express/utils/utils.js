

const generateNewUserID = (UID) => {
  const currentYear=new Date().getFullYear();
  const incriment=parseInt(UID.toString().slice(4))+1;
  console.log(incriment);
  let preceeding=String('');
  console.log(parseInt(incriment.toString().length+4))
  console.log(10-parseInt(incriment.toString().length+4));
  const reqlength=10-parseInt(incriment.toString().length+4);
  for (let i =0; i<reqlength; i++) {
    preceeding=preceeding+'0';
  }
  // eslint-disable-next-line max-len
  const newUserID=currentYear.toString()+preceeding.toString()+incriment.toString();
  return newUserID;
};

module.exports = {
  generateNewUserID,
};
