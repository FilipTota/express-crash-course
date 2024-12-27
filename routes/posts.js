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

// GET all posts
router.get("/", (req, res) => {
  // console.log("req.query :>> ", req.query);
  // res.json(posts); // json() method is same as res.send() but it's for json

  const limit = parseInt(req.query.limit);
  if (!isNaN(limit) && limit > 0) {
    return res.status(200).json(posts.slice(0, limit));
  }
  res.status(200).json(posts);
});

// GET single post
router.get("/:id", (req, res) => {
  // console.log("req.params :>> ", req.params); req.params gets parameters of request
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);
  if (!post) {
    return res
      .status(404)
      .json({ msg: `A Post with the id of ${id} was not found!` });
  }
  res.status(200).json(post);
  // res.status(200).json(posts.filter((post) => post.id === id));
});

// CREATE new post
router.post("/", (req, res) => {
  const newPost = {
    id: posts.length + 1,
    title: req.body.title,
  };

  if (!newPost.title) {
    return res.status(400).json({ msg: "Please include a title" });
  }
  posts.push(newPost);
  res.status(201).json(posts);
});

// UPDATE post
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);
  if (!post) {
    return res
      .status(404)
      .json({ msg: `A Post with the id of ${id} was not found!` });
  }
  post.title = req.body.title;
  res.status(200).json(posts);
});

// DELETE post
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);
  if (!post) {
    return res
      .status(404)
      .json({ msg: `A Post with the id of ${id} was not found!` });
  }
  posts = posts.filter((post) => post.id !== id); // returns all posts exept the one with the id that we get from params
  res.status(200).json(posts);
});

export default router;
