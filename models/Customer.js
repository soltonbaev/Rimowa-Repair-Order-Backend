import Sequelize from "sequelize";

const { DataTypes, Model } = Sequelize;

export default class Customer extends Model {
  static init(sequelize) {
    this.db = sequelize;
    super.init(
      {
        uid: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true
        },
        firstName: { type: DataTypes.STRING },
        lastName: { type: DataTypes.STRING },
        email: { type: DataTypes.STRING, unique: true },
        phone: {
          type: DataTypes.STRING
        },
        companyName: { type: DataTypes.STRING }
      },
      {
        sequelize,
        paranoid: true,
        tableName: "customers"
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
        "firstName",
        "lastName",
        "email",
        "phone",
        "companyName"
      ]
    };

    if (type in attributes) {
      return attributes[type];
    }

    return attributes.default;
  }
  static associate({ Item }) {
    this.hasMany(Item, {
      as: "user_items",
      foreignKey: "ownerId",
      sourceKey: "uid"
    });
  }
}
