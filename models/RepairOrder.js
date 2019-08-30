import Sequelize from "sequelize";

const { DataTypes, Model } = Sequelize;

// mockData = {
//   uid: "f86f8794-6d11-4665-9c98-4dc518c930ab",
//   date: "2019-08-27T21:35:52.126Z",
//   firstName: "Denys",
//   lastName: "Andreiev",
//   email: "denisandreev64@gmail.com",
//   phone: "9292532329",
//   companyName: "company name",
//   shippingAddress: "1914 Bay Ridge parkway apt. 1R",
//   shipWhenComplete: true,
//   items: [
//     {
//       needsBy: "2019-08-29T21:34:00.000Z",
//       serialNumber: "123",
//       lockCombo: "1234",
//       model: "model1",
//       reasonForRepair: "broken wheel",
//       warranty: true,
//       uid: "7902b9f6-79ad-4cdc-aac3-ff23f3f2361e"
//     },
//     {
//       needsBy: "2019-08-30T21:35:00.000Z",
//       serialNumber: "12345",
//       lockCombo: "5689",
//       model: "model2",
//       reasonForRepair: "handle broken",
//       warranty: true,
//       uid: "902f4ae5-85bf-4094-a087-d32b9b94bc01"
//     }
//   ],
//   associateName: "associate 123"
// };

// {
//   uid: {
//     type: DataTypes.UUID,
//     defaultValue: DataTypes.UUIDV4,
//     primaryKey: true
//   },
//   date: { type: DataTypes.STRING },
//   firstName: { type: DataTypes.STRING },
//   lastName: { type: DataTypes.STRING },
//   email: { type: DataTypes.STRING, unique: true },
//   phone: {
//     type: DataTypes.STRING
//   },
//   associateName: { type: DataTypes.STRING },
//   shippingAddress: { type: DataTypes.STRING },
//   shipWhenComplete: { type: DataTypes.BOOLEAN },

//   needsBy: { type: DataTypes.STRING },
//   serialNumber: { type: DataTypes.STRING },
//   lockCombo: { type: DataTypes.STRING },
//   model: { type: DataTypes.STRING },
//   warranty: { type: DataTypes.BOOLEAN },
//   reasonForRepair: { type: DataTypes.STRING }
// }

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
        date: { type: DataTypes.DATE },
        customerId: { type: DataTypes.UUID },
        associateName: { type: DataTypes.STRING },
        shippingAddress: { type: DataTypes.STRING },
        shipWhenComplete: { type: DataTypes.BOOLEAN }
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
    this.hasOne(Customer, {
      as: "customer",
      foreignKey: "uid",
      sourceKey: "customerId"
    });
  }
}
