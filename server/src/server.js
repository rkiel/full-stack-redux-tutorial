import Server from 'socket.io';

export function startServer(port, store) {
  const io = new Server().attach(port);

  // when the store changes, tell all the clients
  store.subscribe(
    () => io.emit('state', store.getState().toJS())
  );

  // when a new client connects, tell them the current state
  io.on('connection', (socket) => {
    socket.emit('state', store.getState().toJS());

    socket.on('action', store.dispatch.bind(store));
  });
}
