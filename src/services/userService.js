import { Router } from "express";
import dbConnection from "../config/dbConfig.js";
import userModel from "../models/userModel.js";

const userRoutes = Router();

export const getUsers = (req, res) => {
  const newUser = new userModel();
  newUser.Read().then((resultados) => {
    res.json(resultados);
  });
};

export const getUserById = (req, res) => {
  const { searchId } = req.params;
  const newUser = new userModel();
  newUser.ReadOne(searchId).then((resultados) => {
    res.json(resultados);
  });
};

export const addUser = (req, res) => {
  let { email, password, fullName, CPF, address } = req.body;
  email = email.trim();
  password = password.trim();
  fullName = fullName.trim();
  CPF = CPF.trim();
  address = address.trim();

  if (
    email == "" ||
    password == "" ||
    fullName == "" ||
    CPF == "" ||
    address == ""
  ) {
    res.json({
      status: "FAILED",
      message: "Preencha todos os campos!!",
    });
    // INCLUIR CÓDIGO PARA SANITIZAÇÃO DOS DADOS
    // } else if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    //   res.json({
    //     status: "FAILED",
    //     message: "E-mail inválido.",
    //   });
    // } else {
  } else {
    const newUser = new userModel(email, password, fullName, CPF, address);
    newUser.Create().then(() => {
      res.json({
        status: "SUCCESS!",
        message: "Usuário " + fullName + " criado com sucesso!",
      });
    });
  }
};

export const login = (req, res) => {
  let { email, password } = req.body;
  email = email.trim();
  password = password.trim();

  if (email == "" || password == "") {
    res.json({
      status: "FAILED",
      message: "Preencha todos os campos!!",
    });
  } else {
    const newUser = new userModel(email, password);
    newUser.Login().then((results) => {
      // console.log(results.length);
      if (results.length == 0) {
        res.json({
          status: "FAILED!",
          message: "Usuário e/ou senha incorretos.",
        });
      } else {
        res.json({
          status: "SUCCESS!",
          message: "Usuário logado com sucesso!",
        });
      }
    });
  }
};

userRoutes.get("/", (req, res) => {
  res.send("Este é um servidor teste, rodando da máquina Ronaldo Pires.");
});

export default userRoutes;
