import db from "../../models";
import Base from "../Base";

const { RepairOrder, Customer, Item } = db.models;

// uid: "dcd2b060-c7b7-4d8d-94f3-28ff851d8ca7",
// date: "2019-08-28T23:38:33.324Z",
// firstName: "Denis",
// lastName: "Andreiev",
// email: "denis@gmail.com",
// phone: "123456789",
// companyName: "Company Name",
// shippingAddress: "Shipping Address 1",
// shipWhenComplete: true,
// customerId: "c3853e27-f827-4ebb-a26d-a6979fb54832",
// items: [
//   {
//     needsBy: "2019-08-30T23:31:00.000Z",
//     serialNumber: "123454321",
//     lockCombo: "9876",
//     model: "SuitCase1",
//     reasonForRepair: "broken wheel",
//     warranty: true,
//     uid: "2f0da2b7-29ab-4b02-9e52-20537d52db65",
//     ownerId: "c3853e27-f827-4ebb-a26d-a6979fb54832"
//   },
//   {
//     needsBy: "2019-08-29T23:32:00.000Z",
//     serialNumber: "321456",
//     lockCombo: "3214",
//     model: "SuitCase2",
//     reasonForRepair: "Broken lock",
//     warranty: false,
//     uid: "abf1e260-553f-44e4-b0e0-1a1ce354dcfc",
//     ownerId: "c3853e27-f827-4ebb-a26d-a6979fb54832"
//   }
// ],
// associateName: "Asociate Name "

export default class CreateRepairOrder extends Base {
  async execute({
    data: {
      uid,
      date,
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
    console.log(
      "-----------insideCREATE_REAPAIR---------",
      JSON.stringify({
        uid,
        date,
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
      })
    );
    if (await RepairOrder.findOne({ where: { uid }, paranoid: false })) {
      throw new Error("NOT_UNIQUE");
    }

    try {
      const order = new RepairOrder({
        uid,
        date,
        customerId,
        associateName,
        shippingAddress,
        shipWhenComplete
      });

      await order.save();

      const customer = new Customer({
        uid: customerId,
        firstName,
        lastName,
        email,
        phone,
        companyName
      });

      await customer.save();

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
