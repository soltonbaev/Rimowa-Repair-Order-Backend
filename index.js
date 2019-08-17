import server from "./server";
import config from "./config";

server.listen(config.port, () => {
  console.log(`API is running on port ${process.env.API_PORT || 3000}`);
});
