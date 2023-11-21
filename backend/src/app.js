import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
//funcion para insertar notificaciones a la base de datos
import path from "path";

dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:8100", "http://192.168.1.167:8100"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("SOCKETIO ON");

  socket.on("foro message", (correo, accion, mensaje) => {
    console.log("Mensaje recibido desde el cliente:", correo);
    io.emit("foro message", correo, accion, mensaje);

    // insNotificacion(correo, accion, mensaje);
    
  }); 
  socket.on("new foro", (correo, accion, mensaje) => {
    io.emit("new foro", correo, accion, mensaje);
    // insNotificacion(correo, accion, mensaje);
  });
  socket.on("notificacion", (correo, accion, mensaje) => {
    console.log("Notificación recibida desde el cliente:", correo);
    io.emit("notificacion", correo, accion, mensaje);
  });

  socket.on("new-comment", (mensaje) => {
    console.log("Mensaje recibido desde el cliente:", mensaje);
    io.emit("new-comment", mensaje);
  });
  socket.on("disconnect", () => {
    console.log("SOCKETIO OFF");
  });
});
// Settings
app.set("port", 4000);


// Middlewares
app.use(
  cors({
    origin: ["http://localhost:8100", "http://192.168.1.167:8100"],
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());


// Routes
app.use("/api/", authRoutes);

// app.use(express.static("uploads"));
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

server.listen(5000, () => {
  console.log("Socket.io: 5000");
});

export default app;