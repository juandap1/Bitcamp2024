import { boot } from "quasar/wrappers";
import { io } from "socket.io-client";

const baseURL = "http://localhost:3000";

const socket = io(baseURL, {
  autoConnect: false,
});

socket.onAny((event, ...args) => {
  console.log(event, args);
});

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async (/* { app, router, ... } */) => {
  // something to do
  app.config.globalProperties.$socket = socket;
});

export { io, socket };
