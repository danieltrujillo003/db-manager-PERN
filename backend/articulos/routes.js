const app = require("express")();
const pg = require("pg");
const bodyParser = require("body-parser");
const controllers = require("./controllers");

module.exports.articulosRoutes = function articulosRoutes(app) {
  // general endpoints
  app.get("/articuloss", (req, res) => res.send("hey"));
  app.get("/:table", controllers.getInfo);
  app.delete('/:table/:id', controllers.deleteInfo);
  app.post('/:table', controllers.addInfo);
  // app.patch('/:table/:id', controllers.editInfo);  
};
