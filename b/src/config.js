const mongoose = require("mongoose");
const socket = require("socket.io");
const { GoogleAuth } = require("google-auth-library");
require("dotenv").config();

mongoose.set("strictQuery", true);
const auth = new GoogleAuth({
  scopes: [
    "https://www.googleapis.com/auth/cloud-platform",
    "https://www.googleapis.com/auth/dialogflow",
  ],
  keyFile: "./src/key.json",
});

module.exports.initial_route = (req, res) => {
  res.send({
    Project: "UBU Science Entry Event",
    Framework: "ExpressJS",
    Interpreter: "NodeJS",
    "API Version": "Alpha 1.0.0",
  });
};

module.exports.connect_to_db = () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("🧩 DB connection successfully!");
    })
    .catch((err) => {
      console.log("⛔ DB connection failed!");
      console.warn(err);
    });
};

module.exports.get_google_auth_token = async (req, res, next) => {
  try {
    const token = await auth.getAccessToken();
    res.send({ token: token });
  } catch (ex) {
    next(ex);
  }
};

module.exports.socket_connect = (server) => {
  try {
    const io = socket(server, {
      cors: {
        origin: "*",
        credentials: true,
      },
    });
    console.log("📡 Socket established!");
    global.onlineUsers = new Map();
    io.on("connection", (socket) => {
      global.chatSocket = socket;
      socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);
      });

      socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
          socket.to(sendUserSocket).emit("msg-receive", data.msg);
        }
      });
    });
  } catch (ex) {
    console.log(ex.message);
  }
};
