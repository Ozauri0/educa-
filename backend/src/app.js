import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import http from "http"; // Importa la biblioteca HTTP de Node.js
import { Server } from "socket.io"; // Importa la biblioteca Socket.io

dotenv.config();

const app = express();
const server = http.createServer(app); // Crea un servidor HTTP

// Inicializa Socket.io pasándole el servidor HTTP
const io = new Server(server, {
  cors: {
    origin: "http://localhost:8100",
    credentials: true,
  },
});

// Maneja conexiones de Socket.io
io.on("connection", (socket) => {
  console.log("Cliente conectado a Socket.io");

  socket.on('chat message', (message) => {
    io.emit('chat message', message); // Enviar el mensaje a todos los clientes
  });

  // Maneja eventos de notificación desde el cliente
  socket.on("notificacion", (data) => {
    console.log("Notificación recibida desde el cliente:", data);
    // Aquí puedes procesar la notificación y retransmitirla a otros clientes si es necesario.
  });

  // Maneja la desconexión del cliente
  socket.on("disconnect", () => {
    console.log("Cliente desconectado de Socket.io");
  });
});

// Settings
app.set("port", 4000);

// Middlewares
app.use(
  cors({
    origin: "http://localhost:8100",
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/", authRoutes);

server.listen(5000, () => {
  console.log("Servidor Socket.io escuchando en el puerto 5000");
});

export default app;