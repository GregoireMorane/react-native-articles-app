const fetch = require("node-fetch");
const cheerio = require("cheerio");

const getMetaProperties = url => {
  return fetch(url)
    .then(res => res.text())
    .then(text => {
      const $ = cheerio.load(text);
      const title = $("title").text() || "";
      const url_img =
        $('meta[property="og:image"]').attr("content") ||
        $("img")
          .first()
          .attr("src") ||
        "";
      const description =
        $('meta[property="og:description"]').attr("content") || "";
      return { title, url_img, description };
    });
};

module.exports = { getMetaProperties };
