import { makeServiceRunner } from "../tools";

import CreateRepairOrder from "../services/orders/Create";
import FetchOrdersList from "../services/orders/List";

export default {
  create: makeServiceRunner(CreateRepairOrder, req => {
    return req.body;
  }),
  list: makeServiceRunner(FetchOrdersList)
};
