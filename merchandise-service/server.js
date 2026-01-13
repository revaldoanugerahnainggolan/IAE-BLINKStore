// ================================
// IMPORT LIBRARY
// ================================
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const fs = require("fs");
const cors = require("cors");
const mysql = require("mysql2");

// ================================
// KONEKSI MYSQL (REVISI UNTUK DOCKER)
// ================================
const db = mysql.createConnection({
  host: "host.docker.internal",   // <--- PENTING: agar Docker bisa akses MySQL laptop
  user: "root",
  password: "",
  database: "merch_db"
});

// ================================
// BACA SCHEMA GRAPHQL
// ================================
const typeDefs = fs.readFileSync("./schema.graphql", "utf8");

// ================================
// RESOLVERS
// ================================
const resolvers = {
  Query: {
    // Ambil semua merchandise
    getMerchandises: () => {
      return new Promise((resolve, reject) => {
        db.query("SELECT * FROM merchandise", (err, result) => {
          if (err) reject(err);
          resolve(result);
        });
      });
    },

    // Ambil merchandise berdasarkan ID
    getMerchandiseById: (_, { id }) => {
      return new Promise((resolve, reject) => {
        db.query(
          "SELECT * FROM merchandise WHERE id = ?",
          [id],
          (err, result) => {
            if (err) reject(err);
            resolve(result[0]);
          }
        );
      });
    },

    // Filter berdasarkan kategori
    getMerchandisesByCategory: (_, { category }) => {
      return new Promise((resolve, reject) => {
        db.query(
          "SELECT * FROM merchandise WHERE category = ?",
          [category],
          (err, result) => {
            if (err) reject(err);
            resolve(result);
          }
        );
      });
    },

    // Ambil yang stok tersedia
    getAvailableMerchandises: () => {
      return new Promise((resolve, reject) => {
        db.query(
          "SELECT * FROM merchandise WHERE stock > 0",
          (err, result) => {
            if (err) reject(err);
            resolve(result);
          }
        );
      });
    }
  },

  Mutation: {
    // ================================
    // TAMBAH MERCHANDISE
    // ================================
    addMerchandise: (_, { name, category, price, stock, description }) => {
      return new Promise((resolve, reject) => {
        db.query(
          "INSERT INTO merchandise (name, category, price, stock, description) VALUES (?, ?, ?, ?, ?)",
          [name, category, price, stock, description],
          (err, result) => {
            if (err) reject(err);
            resolve({
              id: result.insertId,
              name,
              category,
              price,
              stock,
              description
            });
          }
        );
      });
    },

    // ================================
    // UPDATE MERCHANDISE
    // ================================
    updateMerchandise: (_, { id, name, category, price, stock, description }) => {
      return new Promise((resolve, reject) => {
        db.query(
          "UPDATE merchandise SET name=?, category=?, price=?, stock=?, description=? WHERE id=?",
          [name, category, price, stock, description, id],
          (err) => {
            if (err) reject(err);
            resolve({ id, name, category, price, stock, description });
          }
        );
      });
    },

    // ================================
    // DELETE MERCHANDISE
    // ================================
    deleteMerchandise: (_, { id }) => {
      return new Promise((resolve, reject) => {
        db.query("DELETE FROM merchandise WHERE id=?", [id], (err, result) => {
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

  app.listen(4002, () => {
    console.log("Merchandise Service running at http://localhost:4002/graphql");
  });
}

startServer();
