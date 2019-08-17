import db from "../../models";
import Base from "../Base";

const { Customer } = db.models;

export default class CreateCustomer extends Base {
  async execute({ data: { firstName, lastName, email, phone, companyName } }) {
    if (await Customer.findOne({ where: { email }, paranoid: false })) {
      throw new Error({
        message: "NOT_UNIQUE"
      });
    }

    const customer = new Customer({
      firstName,
      lastName,
      email,
      phone,
      companyName
    });

    await customer.save();

    return {
      data: customer
    };
  }
}
