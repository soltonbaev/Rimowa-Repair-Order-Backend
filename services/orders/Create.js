import db from "../../models";
import Base from "../Base";
import { STATUSES } from "../../constants";
import mailSender from "../mailer";

const { RepairOrder, Customer, Item } = db.models;

export default class CreateRepairOrder extends Base {
  async execute({
    data: {
      emailTemplate,
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

      mailSender.sendMail({
        from: "rimowaclientcare@gmail.com",
        to: email,
        subject: `Hello ${firstName} ${lastName}, here is your Rimowa repair ticket confirmation`,
        html: emailTemplate,
        attachments: null
      });

      return {
        data: order,
        status: "SUCCESS"
      };
    } catch (error) {
      return { data: { error } };
    }
  }
}
