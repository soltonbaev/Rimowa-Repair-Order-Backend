import express from "express";
import json2xls from "json2xls";

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

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(morgan("combined")); // use 'tiny' or 'combined'
app.use(json2xls.middleware);

// App Routes
app.use(routes);

export default app;
