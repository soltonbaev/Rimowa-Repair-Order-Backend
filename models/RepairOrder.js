import Sequelize from "sequelize";

const { DataTypes, Model } = Sequelize;

import { ORDER_STATUSES } from "../constants";

import db from "./";

export default class RepairOrder extends Model {
  static init(sequelize) {
    this.db = sequelize;
    super.init(
      {
        uid: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true
        },
        creationDate: { type: DataTypes.DATE },
        customerId: { type: DataTypes.UUID, foreignKey: true },
        associateName: { type: DataTypes.STRING },
        shippingAddress: { type: DataTypes.STRING },
        shipWhenComplete: { type: DataTypes.STRING },
        orderStatus: {
          type: DataTypes.ENUM({
            values: [...ORDER_STATUSES]
          })
        },
        signature: { type: DataTypes.TEXT }
      },
      {
        sequelize,
        paranoid: true,
        tableName: "repairOrders"
      }
    );
  }

  static async deleteOrder(uid) {
    const { Customer, Item } = db.models;
    try {
      const order = await this.findOne({
        where: {
          uid
        }
      });

      const customer = await Customer.findOne({
        where: {
          uid: order.customerId
        }
      });

      const items = await Item.findAll({
        where: {
          ownerId: order.customerId
        }
      });

      await order.destroy({ force: true });
      await customer.destroy({ force: true });
      items.forEach(async item => await item.destroy({ force: true }));
      return { message: "Success" };
    } catch (err) {
      return err;
    }
  }

  static list() {
    return this.findAll({
      order: [["createdAt", "DESC"]],
      logging: true,
      include: [
        {
          association: "customer",
          include: ["customer_items"]
        }
      ]
    });
  }

  static attrs(type = "default") {
    const attributes = {
      default: [
        "uid",
        "date",
        "needsBy",
        "associateName",
        "warranty",
        "shippingAddress",
        "shipWhenComplete",
        "reasonForRepair"
      ]
    };

    if (type in attributes) {
      return attributes[type];
    }

    return attributes.default;
  }

  static associate({ Customer }) {
    this.belongsTo(Customer, {
      as: "customer",
      foreignKey: "customerId",
      sourceKey: "uid"
    });
  }
}
