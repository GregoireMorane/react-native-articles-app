const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");
const db = low(adapter);

// ARTICLES

const getArticles = () => db.get("articles").value();

const findArticleByUrl = url =>
  getArticles().find(article => article.url === url);

const findArticleById = id => getArticles().find(article => article.id === id);

const createArticle = properties =>
  db
    .get("articles")
    .push(properties)
    .last()
    .assign({ id: Date.now().toString() })
    .write();

const deleteArticle = id =>
  db
    .get("articles")
    .remove({ id: id })
    .write();

// USERS

const getUsers = () => db.get("users").value();

const findUserByEmail = email => getUsers().find(user => user.email === email);

const findUserById = id => getUser().find(user => user.id === id);

const createUser = data =>
  db
    .get("users")
    .push(data)
    .last()
    .assign({ id: Date.now().toString() })
    .write();

const deleteUser = id =>
  db
    .get("users")
    .remove({ id: id })
    .write();

module.exports = {
  getArticles,
  findArticleByUrl,
  createArticle,
  deleteArticle,
  findArticleById,
  getUsers,
  findUserByEmail,
  findUserById,
  createUser,
  deleteUser
};
