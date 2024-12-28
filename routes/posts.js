import express from "express";
const router = express.Router();

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

// const logger = (req, res, next) => {
//   // we can implement this on a route or the app level
//   console.log(
//     `${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`
//   );
//   next();
// };
// for logger to be on app lvl, we need to import it in server.js

// GET all posts
router.get("/", (req, res, next) => {
  // logger on a route level (for example: we want it to run only on this GET route)
  // -> to use logger middleware on a route lvl, we pass it inside router.get("/", logger, (req, res) => {})

  // console.log("req.query :>> ", req.query);
  // res.json(posts); // json() method is same as res.send() but it's for json

  const limit = parseInt(req.query.limit);
  if (!isNaN(limit) && limit > 0) {
    return res.status(200).json(posts.slice(0, limit));
  }
  res.status(200).json(posts);
});

// GET single post
router.get("/:id", (req, res, next) => {
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
});

// CREATE new post
router.post("/", (req, res, next) => {
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
});

// UPDATE post
router.put("/:id", (req, res, next) => {
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
});

// DELETE post
router.delete("/:id", (req, res, next) => {
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
});

export default router;
