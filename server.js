"use strict";

const express = require("express");
const exphbs  = require("express-handlebars");
const fs    = require("fs");
const urlLib   = require("url");

const PORT = 8080;
const app = express();


app.use(express.static('public'));

// A CRUD app written with React and Redux
app.get("test-crud-app", function(req, res) {

});

// test-handlebars-js app
app.get("/test-handlebars-js/*", function(req, res) {

  // currently, our filename doesn't support pages sitting in a nested directory
  var url = urlLib.parse(req.url);
  var filename = url.pathname.substring(url.pathname.lastIndexOf("/") + 1) || "home";
  var queryString = (url.query) ? url.query.split("&") : "";
  var query = [];
  for(let el of queryString) {
    el = el.split("=");
    query[el[0]] = el[1];
  }

  const VIEWSPATH = __dirname +  "/public/test-handlebars-js/pages";
  const layoutsDir = VIEWSPATH + "/layouts";
  const partialsDir = VIEWSPATH + "/partials";
  const viewsDir = VIEWSPATH + "/views";
  const filepath = viewsDir + "/" + filename + ".hbs";
  const scriptpath = __dirname + "/public/test-handlebars-js/js/views/" + filename + "/";

  const hbs = exphbs.create({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: layoutsDir,
    partialsDir: partialsDir,
  });
  app.set("views", viewsDir);

  app.engine('hbs', hbs.engine);
  app.set("view engine", "hbs");

  fs.stat(filepath, (err, stat) => {

    if( err || !stat || !stat.isFile() ) {
      console.log(err.errno, err.code);
      filename = "404";
    }

console.log(scriptpath);

    fs.readdir(scriptpath, (err, files) => {
      console.log(err, files);

      var obj = {
        page : filename
      };
      if(query.search) { obj.search = query.search; }

      if( !err && files ) {
        obj.files = files;
      }

      res.render(filename, obj);
    });
  });

}); // end test-handlebars-js


app.get("/", function(req, res) {
  res.send("Hello world\n");
});


app.listen(PORT, function() {
  console.log("Running on http://localhost: " + PORT);
});
