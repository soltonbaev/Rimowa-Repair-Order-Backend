import Sequelize from "sequelize";

const { DataTypes, Model } = Sequelize;

import { ORDER_STATUSES } from "../constants";

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
        shipWhenComplete: { type: DataTypes.BOOLEAN },
        orderStatus: {
          type: DataTypes.ENUM({
            values: [...ORDER_STATUSES]
          })
        }
      },
      {
        sequelize,
        paranoid: true,
        tableName: "repairOrders"
      }
    );
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
