import db from "../../models";
import Base from "../Base";
import { STATUSES } from "../../constants";
import moment from "moment";

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
            reasonForRepair,
            walkinOrShipped
          }) =>
            dataForXLSX.push({
              creationDate: moment(creationDate).format("MMM DD YYYY"),
              b: "",
              c: "",
              walkinOrShipped,
              name: `${firstName} ${lastName}`,
              shippingAddress,
              g: "",
              phone,
              email,
              j: "",
              serialNumber,
              warranty,
              m: "",
              n: "",
              o: "",
              p: "",
              q: "",
              r: "",
              s: "",
              t: "",
              u: "",
              v: "",
              shipWhenComplete,
              x: "",
              y: "",
              z: "",
              aa: "",
              ab: "",
              reasonForRepair,
              ad: "",
              ae: "",
              af: "",
              ag: "",
              ah: "",
              ai: "",
              aj: "",
              ak: "",
              al: "",
              am: "",
              an: "",
              ao: "",
              ap: "",
              aq: "",
              ar: "",
              as: "",
              at: "",
              au: "",
              av: "",
              aw: "",
              ax: "",
              ay: "",
              az: "",
              model,
              lockCombo,
              needsBy: moment(needsBy).format("MMM DD YYYY")
              // associateName,
              // orderStatus,
              // companyName,
              // customerId
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
