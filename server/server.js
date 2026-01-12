import dotenv from "dotenv";
import http from "http";
import { app } from "./src/app.js";
import connectDB from "./src/config/db.js";
import { initSocket } from "./src/socket/socket.js";

dotenv.config({ path: "./.env" });

const PORT = process.env.PORT || 8000;

// 1 Create HTTP server from express app
const server = http.createServer(app);

// 2 Initialize Socket.io ONCE
initSocket(server);

// 3 Connect DB then start server
connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server running at port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("MONDODB db connection failed !!!", error);
  });
