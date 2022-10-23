 
// VALIDATE EMAIL
const isValidEmail = (email) => {
    const regEx = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
    return regEx.test(email);
};
  
  // VALIDATE PASSWORD
  const validatePassword = (password) => {
    if (password.length <= 5 || password === '') {
      return false;
    } return true;
  };
  
  // IS EMPTY METHOD
  const isEmpty = (input) => {
    if (input === undefined || input === '') {
      return true;
    }
    if (input.replace(/\s/g, '').length) {
      return false;
    } return true;
  };
  
  // EMPTY FIELD
  const empty = (input) => {
    if (input === undefined || input === '') {
      return true;
    }
  };
  
  
  
  
  
module.exports = {
    isValidEmail,
    validatePassword,
    isEmpty,
    empty
};