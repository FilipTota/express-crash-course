import colors from "colors";

const logger = (req, res, next) => {
  // we can implement this on a route or the app level

  const methodColors = {
    GET: "green",
    POST: "yellow",
    PUT: "blue",
    DELETE: "red",
  };
  const color = methodColors[req.method] || "white";

  console.log(
    `${req.method}`[color] +
      ` ${req.protocol}://${req.get("host")}${req.originalUrl}`
  );
  next();
};

export default logger;
