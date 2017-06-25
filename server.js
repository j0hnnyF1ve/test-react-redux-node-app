"use strict";

const express = require("express");
const exphbs  = require("express-handlebars");
const fs    = require("fs")

const PORT = 8080;
const app = express();


app.use(express.static('public'));

// A CRUD app written with React and Redux
app.get("test-crud-app", function(req, res) {

});

// test-handlebars-js app
app.get("/test-handlebars-js/*", function(req, res) {
  // currently, our filename doesn't support pages sitting in a nested directory
  var filename = req.url.substring(req.url.lastIndexOf("/") + 1) || "home";

  const VIEWSPATH = __dirname +  "/public/test-handlebars-js/pages";
  const layoutsDir = VIEWSPATH + "/layouts";
  const partialsDir = VIEWSPATH + "/partials";
  const viewsDir = VIEWSPATH + "/views";

  const hbs = exphbs.create({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: layoutsDir,
    partialsDir: partialsDir,
  });
  app.set("views", viewsDir);

  app.engine('hbs', hbs.engine);
  app.set("view engine", "hbs");

  fs.stat(viewsDir + "/" + filename + ".hbs", (err, stat) => {

    if( err || !stat || !stat.isFile() ) {
      console.log(err.errno, err.code);

      filename = "404";
    }
    res.render(filename);
  });

});


app.get("/", function(req, res) {
  res.send("Hello world\n");
});


app.listen(PORT, function() {
  console.log("Running on http://localhost: " + PORT);
});
