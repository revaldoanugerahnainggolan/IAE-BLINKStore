// ================================
// KONEKSI MYSQL
// ================================
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "host.docker.internal",   // ⬅️ PENTING UNTUK DOCKER
  user: "root",
  password: "",
  database: "user_db"
});

// Cek koneksi MySQL
db.connect((err) => {
  if (err) {
    console.error("❌ Gagal konek MySQL:", err);
  } else {
    console.log("✅ MySQL terhubung ke user_db");
  }
});

// ================================
// IMPORT LIBRARY
// ================================
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const fs = require("fs");
const cors = require("cors");

// ================================
// BACA SCHEMA GRAPHQL
// ================================
const typeDefs = fs.readFileSync("./schema.graphql", "utf8");

// ================================
// RESOLVERS (LOGIC GRAPHQL)
// ================================
const resolvers = {
  Query: {
    // Ambil semua user
    getUsers: () => {
      return new Promise((resolve, reject) => {
        db.query("SELECT * FROM users", (err, result) => {
          if (err) reject(err);
          resolve(result);
        });
      });
    },

    // Ambil user berdasarkan ID
    getUserById: (_, { id }) => {
      return new Promise((resolve, reject) => {
        db.query("SELECT * FROM users WHERE id = ?", [id], (err, result) => {
          if (err) reject(err);
          resolve(result[0]);
        });
      });
    },

    // Ambil user berdasarkan email
    getUserByEmail: (_, { email }) => {
      return new Promise((resolve, reject) => {
        db.query(
          "SELECT * FROM users WHERE email = ?",
          [email],
          (err, result) => {
            if (err) reject(err);
            resolve(result[0]);
          }
        );
      });
    }
  },

  Mutation: {
    // ================================
    // TAMBAH USER
    // ================================
    addUser: (_, { name, email, phone, address }) => {
      return new Promise((resolve, reject) => {
        db.query(
          "INSERT INTO users (name, email, phone, address) VALUES (?, ?, ?, ?)",
          [name, email, phone, address],
          (err, result) => {
            if (err) reject(err);

            resolve({
              id: result.insertId,
              name,
              email,
              phone,
              address
            });
          }
        );
      });
    },

    // ================================
    // UPDATE USER
    // ================================
    updateUser: (_, { id, name, email, phone, address }) => {
      return new Promise((resolve, reject) => {
        db.query(
          "UPDATE users SET name=?, email=?, phone=?, address=? WHERE id=?",
          [name, email, phone, address, id],
          (err) => {
            if (err) reject(err);
            resolve({ id, name, email, phone, address });
          }
        );
      });
    },

    // ================================
    // DELETE USER
    // ================================
    deleteUser: (_, { id }) => {
      return new Promise((resolve, reject) => {
        db.query("DELETE FROM users WHERE id=?", [id], (err, result) => {
          if (err) reject(err);
          resolve(result.affectedRows > 0);
        });
      });
    }
  }
};

// ================================
// JALANKAN SERVER
// ================================
async function startServer() {
  const app = express();
  app.use(cors());

  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app });

  app.listen(4001, () => {
    console.log("🚀 User Service running at http://localhost:4001/graphql");
  });
}

startServer();
