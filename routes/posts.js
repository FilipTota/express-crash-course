import express from "express";
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "../controllers/postsController.js";
const router = express.Router();

// const logger = (req, res, next) => {
//   // we can implement this on a route or the app level
//   console.log(
//     `${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`
//   );
//   next();
// };
// for logger to be on app lvl, we need to import it in server.js

// GET all posts
router.get("/", getPosts);

// GET single post
router.get("/:id", getPost);

// CREATE new post
router.post("/", createPost);

// UPDATE post
router.put("/:id", updatePost);

// DELETE post
router.delete("/:id", deletePost);

export default router;
