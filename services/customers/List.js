import db from "../../models";
import Base from "../Base";

const { Customer } = db.models;

export default class CustomersList extends Base {
  async execute() {
    const users = await Customer.list();

    return {
      data: users
    };
  }
}
