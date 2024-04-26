export function responseHandler({ res, message, code }) {
  const isError = code !== 200;
  res.status(code).json({ message, isError });
}
