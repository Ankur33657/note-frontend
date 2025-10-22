import io from "socket.io-client";

const CreateSocketConnection = () => {
  const socketUrl =
    process.env.NEXT_PUBLIC_API_URL?.replace(/\/api$/, "") ||
    "http://localhost:3001";

  console.log("Socket connecting to:", socketUrl);

  return io(socketUrl, {
    transports: ["websocket", "polling"],
    withCredentials: true,
  });
};

export default CreateSocketConnection;
