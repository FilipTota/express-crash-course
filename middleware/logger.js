const logger = (req, res, next) => {
  // we can implement this on a route or the app level
  console.log(
    `${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`
  );
  next();
};

export default logger;
