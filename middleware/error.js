const errorHandler = (error, req, res, next) => {
  // to have different error status:
  if (error.status) {
    return res.status(error.status).json({ msg: error.message });
  }

  // if error.status is not defined, by default we would have 500
  res.status(500).json({ msg: error.message });

  // res.status(404).json({ msg: error.message }); // this will give 404 for every error, but we don't want that
};

export default errorHandler;
