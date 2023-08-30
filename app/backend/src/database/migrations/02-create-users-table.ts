import { DataTypes, Model, QueryInterface } from "sequelize";
import { IUser } from "../../Interfaces/users/IUser";

export default {
  up(queryInterfacce: QueryInterface) {
    return queryInterfacce.createTable<Model<IUser>>('users', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    })
  },
  down(queryInterfacce: QueryInterface) {
    return queryInterfacce.dropTable('users');
  }
}