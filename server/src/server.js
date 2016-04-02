import Server from 'socket.io';

export default function startServer(port) {
  const io = new Server().attach(port);
}
