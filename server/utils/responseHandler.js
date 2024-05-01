function responseHandler({ res, code, message }) {
  const isError = code !== 200;
  res.status(code).json({ ...message, isError });
}

module.exports = responseHandler;
