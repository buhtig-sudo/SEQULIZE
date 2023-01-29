const express = require("express");
const app = express();
const { PORT } = require("./util/config");
const { connectToDatabase } = require("./util/db");
const { errorHandler, unknownEndpoint } = require("./error-handler/handler");
require("express-async-errors");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const notesRouter = require("./controllers/works");
app.use(express.json());

app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use("/api/works", notesRouter);

app.use(unknownEndpoint);
// app.use(errorHandler);
const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
