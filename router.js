const express = require("express");
const router = express.Router();
import routes from "./routes";

router.get("/", (req, res) => res.send("Hello world!"));
router.get("/getCustomers", routes.customers.list);

module.exports = router;
