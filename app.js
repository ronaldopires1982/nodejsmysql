import express from "express";
import routes from "./src/controllers/userController.js";
import userModel from "./src/models/userModel.js";

const app = express();

// Configurar middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // extended: true diz para o express utilizar a biblioteca 'qs', permite aninhamento de objetos, para fazer o parse do json. Já a propriedade extended: false direciona o express a utilizar a biblioteca 'querystring', que não permite aninhamento de objetos

// Coloca as rotas no ar
app.use("/", routes);

console.log("Middleware rodando.");

userModel.createTable().then(() => {
  console.log("Tabela 'users' criada ou já existente!");
});

export default app;
