import { DataTypes, Model, QueryInterface } from "sequelize";
import ITeam from "../../Interfaces/ITeam";

export default {
  up(queryInterfacce: QueryInterface) {
    return queryInterfacce.createTable<Model<ITeam>>('teams', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      teamName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'team_name'
      }
    })
  },
  down(queryInterfacce: QueryInterface) {
    return queryInterfacce.dropTable('teams');
  }
}