const unAuthorisedError = (ErrorMessage) => {
  return {StatusCode: 401, ErrorMessage: ErrorMessage};
};
const paymentRequiredError = (ErrorMessage) => {
  return {StatusCode: 402, ErrorMessage: ErrorMessage};
};
const forbiddenError = (ErrorMessage) => {
  return {StatusCode: 403, ErrorMessage: ErrorMessage};
};
const notFoundError = (ErrorMessage) => {
  return {StatusCode: 404, ErrorMessage: ErrorMessage};
};
const invalidRequestError = (ErrorMessage) => {
  return {StatusCode: 404, ErrorMessage: ErrorMessage};
};
const methodNotAllowdError = (ErrorMessage) => {
  return {StatusCode: 405, ErrorMessage: ErrorMessage};
};

const internalServerError = (ErrorMessage) => {
  return {StatusCode: 500, ErrorMessage: ErrorMessage};
};
const customError = (StatusCode, ErrorMessage) => {
  return {StatusCode: StatusCode, ErrorMessage: ErrorMessage};
};

module.exports = {
  unAuthorisedError,
  paymentRequiredError,
  forbiddenError,
  notFoundError,
  invalidRequestError,
  methodNotAllowdError,
  internalServerError,
  customError,
};
