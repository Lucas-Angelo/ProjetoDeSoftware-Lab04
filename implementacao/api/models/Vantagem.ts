import { Model, DataTypes, Sequelize, Optional } from "sequelize";
import Parceiro from "./Parceiro";

export interface IAtributosVantagem {
  id: number,
  parceiro_id: number,
  valor: number,
  descricao: string,
  foto: string,
}
export interface IAtributosVantagemCriacao extends Optional<IAtributosVantagem, 'id'> { }

class Vantagem extends Model<IAtributosVantagem, IAtributosVantagemCriacao> implements IAtributosVantagem {

  id!: number;
  parceiro_id!: number;
  valor!: number;
  descricao!: string;
  foto!: string;

  static initialize(sequelize: Sequelize) {
    Vantagem.init({
      id: {
        type: DataTypes.INTEGER().UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },
      parceiro_id: {
        type: DataTypes.INTEGER().UNSIGNED,
        references: {
          model: Parceiro,
          key: "id"
        }
      },
      valor: {
        type: DataTypes.DOUBLE().UNSIGNED,
        allowNull: false
      },
      descricao: {
        type: DataTypes.STRING(120),
        allowNull: false
      },
      foto: {
        type: DataTypes.STRING(120),
        allowNull: false
      }
    },
      {
        tableName: "vantagem",
        timestamps: false,
        paranoid: false,
        createdAt: false,
        updatedAt: false,
        sequelize,
      })
  }
}

export default Vantagem;
