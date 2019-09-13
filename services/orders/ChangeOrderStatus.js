import db from "../../models";
import Base from "../Base";

const { RepairOrder } = db.models;

export default class ChangeOrderStatus extends Base {
  async execute({ data: { uid, newStatus } }) {
    const order = await RepairOrder.update(
      { orderStatus: newStatus },
      { where: { uid }, logging: true }
    );

    return {
      data: order
    };
  }
}
