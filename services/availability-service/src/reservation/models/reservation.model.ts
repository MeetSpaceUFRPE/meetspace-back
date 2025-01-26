import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'reservas', timestamps: true })
export class Reservation extends Model<Reservation> {
  @Column({
    type: DataType.ENUM('manha', 'tarde', 'noite'),
    allowNull: false,
  })
  turno: 'manha' | 'tarde' | 'noite';

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  usuarioId: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  data: Date;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  salaId: number;
}
