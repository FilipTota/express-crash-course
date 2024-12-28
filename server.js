import express from "express";
import path from "path";
import { fileURLToPath } from "url";
// import posts from router folder
import posts from "./routes/posts.js";
import logger from "./middleware/logger.js";
import errorHandler from "./middleware/error.js";
import notFound from "./middleware/notFound.js";
const PORT = process.env.PORT || 8000;

// initial express into app variable (app variable/object is used for everything like creating routes, using middleware, stating server...)
const app = express();

//---------------------------------LOGGER MIDDLEWARE---------------------------------------------------------
app.use(logger);
// this puts logger middleware on a app level and every route uses this logger

//---------------------------------BODY PARSER MIDDLEWARE----------------------------------------------------------
app.use(express.json()); // this will take care of being able to submit raw json
app.use(express.urlencoded({ extended: false })); // this will allow us to send for data (x-www-form-urlencoded)

//---------------------------------STATIS FOLDER---------------------------------------------------------

// Get the directory name (have to define it ourselfts because __dirname is not defined in ES module, only in CommonJS)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Setup static folder
// -> statis folder will be public
// -> and we can define it to access files through url to not have a lot of different routes for each file
app.use(express.static(path.join(__dirname, "public")));

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

//---------------------------------ERROR HANDLER MIDDLEWARE---------------------------------------------------------
// we put errorHandler below routes, otherwise we could have some conflicts
app.use(notFound);
app.use(errorHandler);

//----------------------------------LISTEN---------------------------------------------------------

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
