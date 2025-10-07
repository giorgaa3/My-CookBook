const path = require("path");
const jsonServer = require("json-server");
const express = require("express");

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();

server.use(express.json({ limit: "10mb" }));
server.use(express.urlencoded({ extended: true, limit: "10mb" }));

server.use(middlewares);
server.use(router);

const PORT = process.env.PORT || 3002;
server.listen(PORT, () => {
  console.log(`Custom JSON Server running at http://localhost:${PORT}`);
});
