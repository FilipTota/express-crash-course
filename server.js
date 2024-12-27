import express from "express";
import path from "path";
// import posts from router folder
import posts from "./routes/posts.js";
const PORT = process.env.PORT || 8000;

// initial express into app variable (app variable/object is used for everything like creating routes, using middleware, stating server...)
const app = express();

//---------------------------------BODY PARSER MIDDLEWARE----------------------------------------------------------
app.use(express.json()); // this will take care of being able to submit raw json
app.use(express.urlencoded({ extended: false })); // this will allow us to send for data (x-www-form-urlencoded)

//---------------------------------STATIS FOLDER---------------------------------------------------------
// Setup static folder
// -> statis folder will be public
// -> and we can define it to access files through url to not have a lot of different routes for each file
// app.use(express.static(path.join(__dirname, "public")));

//---------------------------------BASIC ROUTE---------------------------------------------------------

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

//----------------------------------ROUTES---------------------------------------------------------
app.use("/api/posts", posts);

//----------------------------------LISTEN---------------------------------------------------------

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
