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
// DATA SEMENTARA (TANPA DATABASE)
// ================================
let orders = [];
let idCounter = 1;

// ================================
// RESOLVERS
// ================================
const resolvers = {
  Query: {
    getOrders: () => orders,
    getOrderById: (_, { id }) => orders.find(o => o.id == id),
    getOrdersByUser: (_, { userId }) => orders.filter(o => o.userId == userId),
    getOrdersByStatus: (_, { status }) => orders.filter(o => o.orderStatus === status)
  },

  Mutation: {
    createOrder: (_, { userId, merchandiseId, quantity, price }) => {
      const totalPrice = quantity * price;

      const newOrder = {
        id: idCounter++,
        userId,
        merchandiseId,
        quantity,
        totalPrice,
        orderStatus: "pending",
        createdAt: new Date().toISOString()
      };

      orders.push(newOrder);
      return newOrder;
    },

    updateOrderStatus: (_, { id, orderStatus }) => {
      const order = orders.find(o => o.id == id);
      if (!order) return null;
      order.orderStatus = orderStatus;
      return order;
    },

    cancelOrder: (_, { id }) => {
      const index = orders.findIndex(o => o.id == id);
      if (index === -1) return false;
      orders.splice(index, 1);
      return true;
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

  app.listen(4003, () => {
    console.log("Order Service running at http://localhost:4003/graphql");
  });
}

startServer();
