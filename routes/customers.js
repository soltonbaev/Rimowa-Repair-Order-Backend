import { makeServiceRunner } from "../tools";

import CreateCustomer from "../services/customers/Create";
import CustomersList from "../services/customers/List";

export default {
  create: makeServiceRunner(CreateCustomer, req => req.body),
  list: makeServiceRunner(CustomersList)
};
