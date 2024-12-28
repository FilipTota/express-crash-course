let posts = [
  {
    id: 1,
    title: "Post One",
  },
  {
    id: 2,
    title: "Post Two",
  },
  {
    id: 3,
    title: "Post Three",
  },
];

// @desc    Get all posts
// @route   GET /api/posts
export const getPosts = (req, res, next) => {
  // logger on a route level (for example: we want it to run only on this GET route)
  // -> to use logger middleware on a route lvl, we pass it inside router.get("/", logger, (req, res) => {})

  // console.log("req.query :>> ", req.query);
  // res.json(posts); // json() method is same as res.send() but it's for json

  const limit = parseInt(req.query.limit);
  if (!isNaN(limit) && limit > 0) {
    return res.status(200).json(posts.slice(0, limit));
  }
  res.status(200).json(posts);
};

// @desc    Get single post
// @route   GET /api/posts/:id
export const getPost = (req, res, next) => {
  // console.log("req.params :>> ", req.params); req.params gets parameters of request
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);
  if (!post) {
    // Error handeling
    const error = new Error(`A Post with the id of ${id} was not found!`);
    error.status = 404; // define specific status code (if not defined, default status would be 500)
    return next(error);
  }
  res.status(200).json(post);
  // res.status(200).json(posts.filter((post) => post.id === id));
};

// @desc    Create new post
// @route   POST /api/posts
export const createPost = (req, res, next) => {
  const newPost = {
    id: posts.length + 1,
    title: req.body.title,
  };

  if (!newPost.title) {
    // return res.status(400).json({ msg: "Please include a title" });
    const error = new Error("Please include a title");
    error.status = 400;
    return next(error);
  }
  posts.push(newPost);
  res.status(201).json(posts);
};

// @desc     Update post
// @route    PUT /api/posts/:id
export const updatePost = (req, res, next) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);
  if (!post) {
    // return res
    //   .status(404)
    //   .json({ msg: `A Post with the id of ${id} was not found!` });
    const error = new Error(`A Post with the id of ${id} was not found!`);
    error.status = 404;
    return next(error);
  }
  post.title = req.body.title;
  res.status(200).json(posts);
};

// @desc     Delete post
// @route    DELETE /api/posts/:id
export const deletePost = (req, res, next) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);
  if (!post) {
    // return res
    //   .status(404)
    //   .json({ msg: `A Post with the id of ${id} was not found!` });
    const error = new Error(`A Post with the id of ${id} was not found!`);
    error.status = 404;
    return next(error);
  }
  posts = posts.filter((post) => post.id !== id); // returns all posts exept the one with the id that we get from params
  res.status(200).json(posts);
};
