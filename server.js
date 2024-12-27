const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 8000;

// initial express into app variable (app variable/object is used for everything like creating routes, using middleware, stating server...)
const app = express();

//-------------------------------------------------------------------------------------------
// Setup static folder
// -> statis folder will be public
// -> and we can define it to access files through url to not have a lot of different routes for each file
// app.use(express.static(path.join(__dirname, "public")));

//-------------------------------------------------------------------------------------------

// // add route
// app.get("/", (req, res) => {
//   // display text on page
//   // res.send("Hello world");

//   // display file
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

// app.get("/about", (req, res) => {
//   //   res.send("About");
//   res.sendFile(path.join(__dirname, "public", "about.html"));
// });

//-------------------------------------------------------------------------------------------
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
app.get("/api/posts", (req, res) => {
  // console.log("req.query :>> ", req.query);
  // res.json(posts); // json() method is same as res.send() but it's for json

  const limit = parseInt(req.query.limit);
  if (!isNaN(limit) && limit > 0) {
    return res.status(200).json(posts.slice(0, limit));
  }
  res.status(200).json(posts);
});

// GET single post
app.get("/api/posts/:id", (req, res) => {
  // console.log("req.params :>> ", req.params); req.params gets parameters of request
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);
  if (!post) {
    return res
      .status(404)
      .json({ msg: `Post with the id of ${id} was not found!` });
  }
  res.status(200).json(post);
  // res.status(200).json(posts.filter((post) => post.id === id));
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
