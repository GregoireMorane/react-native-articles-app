const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const low = require("lowdb");
const FileAsync = require("lowdb/adapters/FileAsync");

const app = express();
const adapter = new FileAsync("db.json");

app.use(cors());

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(morgan("dev"));

low(adapter)
  .then(db => {
    // Routes
    // GET all posts
    app.get("/articles", (req, res) => {
      const articles = db.get("articles").value();
      res.send(articles);
    });

    // POST /posts
    app.post("/articles", (req, res) => {
      db.get("articles")
        .push(req.body)
        .last()
        .assign({ id: Date.now().toString() })
        .write()
        .then(article => res.send(article));
    });

    // Set db default values
    return db.defaults({ articles: [] }).write();
  })
  .then(() => {
    app.listen(3002, () => console.log("listening on port 3002"));
  });
