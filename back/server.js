const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const {
  createArticle,
  getArticles,
  deleteArticle,
  getUsers,
  createUser,
  loginUser,
  getUserById,
  addFavoriteArticleToUser
} = require("./controllers");

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(morgan("dev"));

app.get("/articles", getArticles);
app.post("/articles", createArticle);
app.delete("/articles/:id", deleteArticle);
app.get("/users", getUsers);
app.get("/usersById", getUserById);
app.post("/users/register", createUser);
app.post("/users/login", loginUser);
app.post("/users/favorite/:id", addFavoriteArticleToUser);
app.listen(3002, () => {
  console.log("Server listening on port 3002.");
});
