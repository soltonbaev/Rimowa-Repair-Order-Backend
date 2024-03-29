const express = require("express");
const router = express.Router();
import routes from "./routes";

router.get("/", (req, res) => res.send("Hello world!"));
router.get("/getCustomers", routes.customers.list);
router.post("/addOrder", routes.orders.create, req => req.body);
router.get("/orders", routes.orders.list);
router.get("/exportNew", routes.orders.exportNew);
router.delete("/deleteOrder/:uid", routes.orders.deleteOrder);
router.put(
  "/changeOrderStatus",
  routes.orders.changeOrderStatus,
  req => req.body
);

module.exports = router;
