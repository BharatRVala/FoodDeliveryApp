import { Server } from "socket.io";

let io;

export function GET(req) {
  if (!io) {
    io = new Server(globalThis.server, {
      path: "/api/socket",
      addTrailingSlash: false,
    });
    globalThis.server = io;

    io.on("connection", (socket) => {
      console.log("⚡ Delivery partner connected:", socket.id);

      socket.on("join-city", (city) => {
        socket.join(city);
        console.log(`Socket ${socket.id} joined city room: ${city}`);
      });

      socket.on("accept-order", ({ orderId, deliveryBoyId }) => {
        io.emit("order-accepted", { orderId, deliveryBoyId });
      });

      socket.on("disconnect", () => {
        console.log("❌ Delivery partner disconnected:", socket.id);
      });
    });
  }

  return new Response("Socket initialized");
}
