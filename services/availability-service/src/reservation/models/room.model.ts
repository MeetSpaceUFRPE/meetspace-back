import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

@Table({
  tableName: 'salas',
  timestamps: true,
})
export class Room extends Model<Room> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  nome: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  capacidade: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  localizacao: string;

  @Column({
    type: DataType.ARRAY(DataType.STRING),
    allowNull: true,
  })
  recursos: string[];
}
