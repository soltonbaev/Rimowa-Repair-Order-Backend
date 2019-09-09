import db from "../../models";
import Base from "../Base";

const { RepairOrder } = db.models;

export default class DeleteOrder extends Base {
  async execute({ data: { uid } }) {
    const orders = await RepairOrder.deleteOrder(uid);

    return {
      data: orders
    };
  }
}
