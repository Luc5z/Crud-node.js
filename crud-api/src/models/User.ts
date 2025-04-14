import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType } from 'sequelize-typescript';

@Table({ tableName: 'users' })
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  name!: string;

  @Column({
    allowNull: false,
    unique: true,
    type: DataType.STRING,
  })
  email!: string;

  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  age!: number;
}
