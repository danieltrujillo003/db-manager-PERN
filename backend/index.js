const app = require("express")();
const pg = require("pg");
const bodyParser = require("body-parser");
const articulosRoutes = require('./articulos/routes');

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.get("/", (req, res) => res.send({ message: "Welcome to TAMAPRINT API." }));

articulosRoutes.articulosRoutes(app);

app.listen(port, () => console.log(`Listening on port ${port}...`));
