import mysql from "mysql2";

const dbConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "testereactnative",
});

dbConnection.connect((err) => {
  if (err) {
    console.error("Ocorreu um erro: " + err);
    return;
  }
  console.log("Conexão ao banco de dados testereactnative feito com sucesso.");
});

export default dbConnection;
