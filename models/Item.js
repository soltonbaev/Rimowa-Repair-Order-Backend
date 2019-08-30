import Sequelize from "sequelize";

const { DataTypes, Model } = Sequelize;

export default class Item extends Model {
  static init(sequelize) {
    this.db = sequelize;
    super.init(
      {
        uid: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true
        },
        ownerId: { type: DataTypes.UUID },
        serialNumber: { type: DataTypes.STRING },
        lockCombo: { type: DataTypes.STRING },
        model: { type: DataTypes.STRING },
        needsBy: { type: DataTypes.STRING },
        warranty: { type: DataTypes.BOOLEAN },
        reasonForRepair: { type: DataTypes.STRING }
      },
      {
        sequelize,
        paranoid: true,
        tableName: "items"
      }
    );
  }

  static list() {
    return this.findAll({});
  }

  static attrs(type = "default") {
    const attributes = {
      default: ["uid", "ownerId", "serialNumber", "lockCombo", "purchaseOrigin"]
    };

    if (type in attributes) {
      return attributes[type];
    }

    return attributes.default;
  }
}
