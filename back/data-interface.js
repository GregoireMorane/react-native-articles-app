const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");
const db = low(adapter);

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

module.exports = {
  getArticles,
  findArticleByUrl,
  createArticle,
  deleteArticle,
  findArticleById
};
