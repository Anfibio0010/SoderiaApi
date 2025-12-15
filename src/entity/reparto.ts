import { BaseEntity } from './base.js';
import { Entity, PrimaryKeyProp, Property } from '@mikro-orm/core';
import { PrimaryKey, OneToMany, ManyToOne } from '@mikro-orm/core';
import { Empleado } from './empleado.js';
import { RepartoProducto } from './reparto_producto.js';
//* Para evitar problemas no voy a heredar la base entity, ya que quiero definir una clave compuesta
export class Reparto extends BaseEntity {
  @ManyToOne(() => Empleado, { primary: true })
  repartidor!: Empleado;
  @PrimaryKey()
  fecha!: Date;
  @Property({ nullable: false })
  abonox12!: number;
  @Property({ nullable: false })
  abonox20!: number;
  @Property({ nullable: false })
  descartex12!: number;
  @Property({ nullable: false })
  descartex20!: number;
  @Property({ nullable: false })
  efectivo!: number;
  @Property({ nullable: false })
  transferencia!: number;
  @Property({ nullable: false })
  gastos!: number;
  @Property({ nullable: false })
  ctaCte!: number;
  @Property({ nullable: false })
  pagoEmpresas!: number;
  @OneToMany(
    () => RepartoProducto,
    (repartoProducto) => repartoProducto.reparto
  )
  productosRepartidos!: RepartoProducto[];
  //! Esto se comento porque no es el momento de implementarlo, al implementar esto se podría calcular cuantos envases tiene cada cliente
  /*   @OneToMany(() => Cliente , cliente => cliente.id)
  clientesAtendidos!: Cliente[]; */
  //! Esto se necesita para que funcionen bien las querys
  [PrimaryKeyProp]?: ['repartidor', 'fecha'];
}
