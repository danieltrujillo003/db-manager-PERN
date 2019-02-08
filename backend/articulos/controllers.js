const pg = require("pg");
const { Pool, Client } = pg;

const connectionString =
  "postgres://tamaprintSuperUser:tamaprintpass@localhost/tamaprint";

const getInfo = (req, res) => {
  const pool = new Pool({
    connectionString: connectionString
  });
  pool.query("SELECT NOW()", (err, res) => {
    console.log("pool->", err, res.rows);
    pool.end();
  });
  const client = new Client({
    connectionString: connectionString
  });
  client.connect();
  client.query(`SELECT * FROM ${req.params.table}`, (err, result) => {
    if (err) {
      res.status(500).send({ error: err });
      client.end();
    } else {
      res.send({ info: result.rows });
      console.log("hey");
      client.end();
    }
  });
};

const deleteInfo = (req, res) => {
  const pool = new Pool({
    connectionString: connectionString
  });
  pool.query("SELECT NOW()", (err, res) => {
    console.log("pool->", err, res.rows);
    pool.end();
  });
  const client = new Client({
    connectionString: connectionString
  });
  client.connect();
  client.query(
    `DELETE FROM ${req.params.table} WHERE id = $1`,
    [req.params.id],
    (err, result) => {
      res.send({ message: `data with id ${req.params.id} deleted` });
      client.end();
    }
  );
};

const addInfo = (req, res) => {
  const {
    grupo,
    hijo,
    porcentaje,
    nota,
    departamento,
    fecha_inicio,
    fecha_fin,
    nombre,
    inicial,
    final,
    conversion,
    tipo,
    iva,
    clasificadores,
    retefuente,
    tipo_adquirido,
    notas,
    unidades_medida, main
  } = req.body;

  const pool = new Pool({
    connectionString: connectionString
  });
  pool.query("SELECT NOW()", (err, res) => {
    console.log("pool->", err, res.rows);
    pool.end();
  });
  const client = new Client({
    connectionString: connectionString
  });
  client.connect();
  req.params.table == "clasificadores"
    ? client.query(
        "INSERT INTO clasificadores(grupo, hijo) VALUES($1, $2)",
        [grupo, hijo],
        (err, result) => {
          if (err) {
            res.status(500).send({ err });
          } else {
            res.send({ message: "succeed" });
          }
          client.end();
        }
      )
    : req.params.table == "iva"
    ? client.query(
        "INSERT INTO iva(main) VALUES($1)",
        [main],
        (err, result) => {
          if (err) {
            res.status(500).send({ err });
          } else {
            res.send({ message: "succeed" });
          }
          client.end();
        }
      )
    : req.params.table == "notas"
    ? client.query(
        "INSERT INTO notas(main, departamento, fecha_inicio, fecha_fin) VALUES($1, $2, $3, $4)",
        [main, departamento, fecha_inicio, fecha_fin],
        (err, result) => {
          if (err) {
            res.status(500).send({ err });
          } else {
            res.send({ message: "succeed" });
          }
          client.end();
        }
      )
    : req.params.table == "retefuente"
    ? client.query(
        "INSERT INTO retefuente(main, porcentaje) VALUES($1, $2)",
        [main, porcentaje],
        (err, result) => {
          if (err) {
            res.status(500).send({ err });
          } else {
            res.send({ message: "succeed" });
          }
          client.end();
        }
      )
    : req.params.table == "tipo_adquirido"
    ? client.query(
        "INSERT INTO tipo_adquirido(main) VALUES($1)",
        [main],
        (err, result) => {
          if (err) {
            res.status(500).send({ err });
          } else {
            res.send({ message: "succeed" });
          }
          client.end();
        }
      )
    : req.params.table == "unidades_medida"
    ? client.query(
        "INSERT INTO unidades_medida(main, final, conversión) VALUES($1, $2, $3)",
        [main, final, conversion],
        (err, result) => {
          if (err) {
            res.status(500).send({ err });
          } else {
            res.send({ message: "succeed" });
          }
          client.end();
        }
      )
    : req.params.table == "articulos"
    ? client.query(
        "INSERT INTO articulos(nombre, iva, clasificadores, retefuente, tipo_adquirido, notas, unidades_medida) VALUES($1, $2, $3, $4, $5, $6, $7)",
        [
          nombre, 
          iva,
          clasificadores,
          retefuente,
          tipo_adquirido,
          notas,
          unidades_medida
        ],
        (err, result) => {
          if (err) {
            res.status(500).send({ err });
          } else {
            res.send({ message: "succeed" });
          }
          client.end();
        }
      )
    : res.status(404).send({ message: "Enter a valid table name" });
};

module.exports = { getInfo, deleteInfo, addInfo };
