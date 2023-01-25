

const notFoundError = (ErrorMessage) => {
  return {StatusCode: 404, ErrorMessage: ErrorMessage};
};

const forbiddenError = (ErrorMessage) => {
  return {StatusCode: 403, ErrorMessage: ErrorMessage};
};

const internalServerError = (ErrorMessage) => {
  return {StatusCode: 500, ErrorMessage: ErrorMessage};
};

module.exports = {
  notFoundError,
  forbiddenError,
  internalServerError,
};
