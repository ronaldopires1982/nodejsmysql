import dbConnection from "../config/dbConfig.js";

export default class userModel {
  static createTable() {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        fullName VARCHAR(255) NOT NULL,
        CPF VARCHAR(11) NOT NULL UNIQUE,
        address VARCHAR(255) NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `;
    return new Promise((resolve, reject) => {
      dbConnection.query(createTableQuery, (err, results) => {
        if (err) return reject(err);
        resolve(results);
        // console.log(results);
      });
    });
  }

  constructor(email, password, fullName, CPF, address) {
    this.email = email;
    this.password = password;
    this.fullName = fullName;
    this.CPF = CPF;
    this.address = address;
  }

  Create() {
    const sql =
      "INSERT INTO users (email, password, fullName, CPF, address) VALUES (?, ?, ?, ?, ?)";
    return new Promise((resolve, reject) => {
      dbConnection.query(
        sql,
        [this.email, this.password, this.fullName, this.CPF, this.address],
        (err, results) => {
          if (err) {
            console.log(err);
            return reject(err);
          } else {
            resolve(results);
          }
        }
      );
    });
  }

  Read() {
    const sql = "SELECT * FROM users";
    return new Promise((resolve, reject) => {
      dbConnection.query(sql, (err, results) => {
        if (err) {
          return reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  ReadOne(searchId) {
    const sql = "SELECT * FROM users WHERE id = ?";
    return new Promise((resolve, reject) => {
      dbConnection.query(sql, [searchId], (err, results) => {
        if (err) {
          return reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  Login() {
    const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
    return new Promise((resolve, reject) => {
      dbConnection.query(sql, [this.email, this.password], (err, results) => {
        if (!results) {
          return reject(err);
        } else {
          if (err) {
            return reject(err);
          } else {
            resolve(results);
          }
        }
      });
    });
  }
}
