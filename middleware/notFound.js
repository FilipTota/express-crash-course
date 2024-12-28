// Not Found for every route that does not exist
const notFound = (req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
};

export default notFound;
