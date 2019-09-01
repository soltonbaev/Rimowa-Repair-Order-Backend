import db from "../../models";
import Base from "../Base";
import { STATUSES } from "../../constants";

const { RepairOrder } = db.models;

export default class ExportNewOrders extends Base {
  async execute() {
    const orders = await RepairOrder.findAll({
      where: {
        orderStatus: STATUSES.NEW
      },
      include: [
        {
          association: "customer",
          include: ["customer_items"]
        }
      ]
    });
    const dataForXLSX = [];
    orders.forEach(
      ({
        creationDate,
        customerId,
        associateName,
        shippingAddress,
        shipWhenComplete,
        orderStatus,
        customer: {
          firstName,
          lastName,
          email,
          phone,
          companyName,
          customer_items
        }
      }) =>
        customer_items.forEach(
          ({
            serialNumber,
            lockCombo,
            model,
            needsBy,
            warranty,
            reasonForRepair
          }) =>
            dataForXLSX.push({
              creationDate,
              customerId,
              associateName,
              shippingAddress,
              shipWhenComplete,
              orderStatus,
              firstName,
              lastName,
              email,
              phone,
              companyName,
              serialNumber,
              lockCombo,
              model,
              needsBy,
              warranty,
              reasonForRepair
            })
        )
    );

    const updatedOrdersCount = await RepairOrder.update(
      {
        orderStatus: STATUSES.IN_PROGRESS
      },
      {
        where: {
          orderStatus: STATUSES.NEW
        }
      }
    );

    return {
      data: dataForXLSX,
      xls: JSON.parse(JSON.stringify(dataForXLSX)),
      count: updatedOrdersCount
    };
  }
}
