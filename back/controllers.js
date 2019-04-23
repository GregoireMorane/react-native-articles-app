const { getMetaProperties } = require("./scrape");
const dataInterface = require("./data-interface");
const bcrypt = require("bcrypt");

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
    bcrypt.hash(request.body.password, 12, function(err, hashedPassword) {
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

module.exports = {
  createArticle,
  getArticles,
  deleteArticle,
  getUsers,
  createUser,
  deleteUser
};
