import Sequelize from "sequelize";
import config from "../config";

import Customer from "./Customer";
import Item from "./Item";
import RepairOrder from "./RepairOrder";

const sequelize = new Sequelize({
  ...config.postgres,
  operatorsAliases: Sequelize.Op
});

RepairOrder.init(sequelize);
Customer.init(sequelize);
Item.init(sequelize);

const { models } = sequelize;

for (const modelName in models) {
  const model = models[modelName];
  if ("associate" in model) {
    model.associate(models, sequelize);
  }
}

sequelize.sync({ logging: true, force: false });

export default sequelize;
