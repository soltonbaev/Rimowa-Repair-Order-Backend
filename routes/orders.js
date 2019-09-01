import { makeServiceRunner } from "../tools";

import CreateRepairOrder from "../services/orders/Create";
import FetchOrdersList from "../services/orders/List";
import ExportNewOrders from "../services/orders/ExportNewOrders";

export default {
  create: makeServiceRunner(CreateRepairOrder, req => {
    return req.body;
  }),
  list: makeServiceRunner(FetchOrdersList),
  exportNew: makeServiceRunner(ExportNewOrders)
};
