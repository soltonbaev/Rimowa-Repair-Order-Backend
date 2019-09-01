import db from "../../models";
import Base from "../Base";
import { STATUSES } from "../../constants";

const { RepairOrder, Customer, Item } = db.models;

export default class CreateRepairOrder extends Base {
  async execute({
    data: {
      uid,
      creationDate,
      customerId,
      firstName,
      lastName,
      email,
      phone,
      companyName,
      shippingAddress,
      shipWhenComplete,
      associateName,
      items
    }
  }) {
    if (await RepairOrder.findOne({ where: { uid }, paranoid: false })) {
      throw new Error("NOT_UNIQUE");
    }

    try {
      const customer = new Customer({
        uid: customerId,
        firstName,
        lastName,
        email,
        phone,
        companyName
      });

      await customer.save();

      const order = new RepairOrder({
        uid,
        creationDate,
        customerId,
        associateName,
        shippingAddress,
        shipWhenComplete,
        orderStatus: STATUSES.NEW
      });

      await order.save();

      const itemsArr =
        items.length &&
        items.map(
          ({
            uid,
            ownerId,
            serialNumber,
            lockCombo,
            model,
            needsBy,
            warranty,
            reasonForRepair
          }) => {
            const item = new Item({
              uid,
              ownerId,
              serialNumber,
              lockCombo,
              model,
              needsBy,
              warranty,
              reasonForRepair
            });
            return item;
          }
        );

      itemsArr.forEach(async item => await item.save());

      return {
        data: order,
        status: "SUCCESS"
      };
    } catch (error) {
      return { data: { error } };
    }
  }
}
