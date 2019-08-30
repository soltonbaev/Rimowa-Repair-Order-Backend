import db from "../../models";
import Base from "../Base";

const { RepairOrder } = db.models;

export default class FetchOrdersList extends Base {
  async execute() {
    const orders = await RepairOrder.list();

    return {
      data: orders
    };
  }
}
