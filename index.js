import server from "./server";
import config from "./config";

server.listen(config.port, () => {
  console.log(`API is running on port ${process.env.PORT || 3000}`);
});
