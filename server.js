import express from "express";

// use process.env variables to keep private variables,
require("dotenv").config();

// Express Middleware
import helmet from "helmet"; // creates headers that protect from attacks (security)
import bodyParser from "body-parser"; // turns response into usable format
import cors from "cors"; // allows/disallows cross-site communication
import morgan from "morgan"; // logs requests

// App
const app = express();

const routes = require("./router");

// App Middleware
const whitelist = ["http://localhost:3000"];
const corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
};
app.use(helmet());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(morgan("combined")); // use 'tiny' or 'combined'

// App Routes
app.use(routes);

export default app;
