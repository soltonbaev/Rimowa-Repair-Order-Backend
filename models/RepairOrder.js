import Sequelize from "sequelize";

const { DataTypes, Model } = Sequelize;

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
        date: { type: DataTypes.STRING },
        needsBy: { type: DataTypes.STRING },
        associateName: { type: DataTypes.STRING },
        warranty: { type: DataTypes.BOOLEAN },
        shippingAddress: { type: DataTypes.STRING },
        shipWhenComplete: { type: DataTypes.BOOLEAN },
        reasonForRepair: { type: DataTypes.STRING }
      },
      {
        sequelize,
        paranoid: true,
        tableName: "repairOrders"
      }
    );
  }

  static list() {
    return this.findAll({});
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
}
