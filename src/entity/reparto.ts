import { BaseEntity } from './base.js';
import { Entity, PrimaryKeyProp, Property } from '@mikro-orm/core';
import { PrimaryKey, OneToMany, ManyToOne } from '@mikro-orm/core';
import { Empleado } from './empleado.js';
import { RepartoProducto } from './reparto_producto.js';
//* Para evitar problemas no voy a heredar la base entity, ya que quiero definir una clave compuesta
export class Reparto {
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
  constructor(
    repartidor: Empleado,
    fecha: Date,
    abonox12: number,
    abonox20: number,
    descartex12: number,
    descartex20: number,
    efectivo: number,
    transferencia: number,
    gastos: number,
    ctaCte: number,
    pagoEmpresas: number
  ) {
    this.repartidor = repartidor;
    this.fecha = fecha;
    this.abonox12 = abonox12;
    this.abonox20 = abonox20;
    this.descartex12 = descartex12;
    this.descartex20 = descartex20;
    this.efectivo = efectivo;
    this.transferencia = transferencia;
    this.gastos = gastos;
    this.ctaCte = ctaCte;
    this.pagoEmpresas = pagoEmpresas;
  }
}
