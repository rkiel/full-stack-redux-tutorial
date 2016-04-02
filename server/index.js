import makeStore from './src/store';
import {startServer} from './src/server';

console.log("creating Redux store");
export const store = makeStore();

const serverPort = 8090;
startServer(serverPort, store);
console.log("server now listening on port", serverPort);
