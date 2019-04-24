const { getMetaProperties } = require("./scrape");
const dataInterface = require("./data-interface");
const bcrypt = require("bcrypt");
const utils = require("./utils");

// ARTICLES

const getArticles = (request, response) => {
  response.send(dataInterface.getArticles());
};

const createArticle = async (request, response) => {
  const url = request.body.url;

  if (dataInterface.findArticleByUrl(url)) {
    response.send(403, { error: "Article URL exists already." });
  } else {
    const properties = { ...(await getMetaProperties(url)), url };
    dataInterface.createArticle(properties);

    response.send(201, properties);
  }
};

const deleteArticle = (request, response) => {
  const id = request.params.id;
  if (dataInterface.findArticleById(id)) {
    dataInterface.deleteArticle(id);
    response.send(200, { ok: "Article deleted" });
  } else {
    response.send(404, { error: "Article does not exist" });
  }
};

// USERS

const getUsers = (request, response) => {
  response.send(dataInterface.getUsers());
};

const createUser = async (request, response) => {
  const email = request.body.email;

  if (dataInterface.findUserByEmail(email)) {
    response.send(403, { error: "Email already taken" });
  } else {
    bcrypt.hash(request.body.password, 12, (err, hashedPassword) => {
      const data = { ...request.body, password: hashedPassword };
      dataInterface.createUser(data);
      response.send(201, data);
    });
  }
};

const deleteUser = (request, response) => {
  const id = request.params.id;
  if (dataInterface.findUserbyId(id)) {
    dataInterface.deleteUser(id);
    response.send(200, { ok: "User deleted" });
  } else {
    response.send(404, { error: "User does not exist" });
  }
};

const loginUser = (req, res) => {
  const email = req.body.email;
  if (dataInterface.findUserByEmail(email)) {
    const UserFound = dataInterface.findUserByEmail(email);
    bcrypt.compare(req.body.password, UserFound.password, (error, response) => {
      const token = utils.generateToken(UserFound);
      if (response) {
        return res
          .status(200)
          .set("x-access-token", token)
          .header("Access-Control-Expose-Headers", "x-access-token")
          .json({
            id: UserFound.id,
            token: token
          });
      } else {
        return res.send(404, { error: "Wrong password" });
      }
    });
  } else {
    res.send(404, { error: "User does not exist" });
  }
};

const getUserById = (req, res) => {
  const token = req.params.token;
  const id = utils.getUserId(token);
  res.send(dataInterface.findUserById(id));
};

const addFavoriteArticleToUser = (req, res) => {
  const articleId = req.params.id;
  const token = req.headers["x-access-token"];
  const userId = utils.getUserId(token);
  dataInterface.addFavoriteArticle(userId, articleId);
  res.send(201, dataInterface.findUserById(userId));
};

module.exports = {
  createArticle,
  getArticles,
  deleteArticle,
  getUsers,
  createUser,
  deleteUser,
  loginUser,
  getUserById,
  addFavoriteArticleToUser
};
