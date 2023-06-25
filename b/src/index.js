const express = require("express");
const cors = require("cors");
const messageRoutes = require("../routes/messages");
const postRoutes = require("../routes/post");
const studentRoures = require("../routes/student");
const teacherRoures = require("../routes/teacher");
const app = express();
const {
  connect_to_db,
  get_google_auth_token,
  socket_connect,
  initial_route,
} = require("./config");

require("dotenv").config();

app.use(cors());
app.use(express.json({ limit: "10mb" }));

// Routes
app.get("/", initial_route);
app.get("/google_auth", get_google_auth_token);
app.use("/api/messages", messageRoutes);
app.use("/api", postRoutes);
app.use("/api", studentRoures);
app.use("/api", teacherRoures);

const server = app.listen(process.env.PORT, () =>
  console.log(
    `🚀 Server ready in local at: http://localhost:${process.env.PORT}`
  )
);

connect_to_db();
socket_connect(server);

module.exports = app;
