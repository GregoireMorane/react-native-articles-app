const { getMetaProperties } = require("./scrape");
const dataInterface = require("./data-interface");

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

module.exports = { createArticle, getArticles, deleteArticle };
