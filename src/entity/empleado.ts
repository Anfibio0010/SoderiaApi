import { BaseEntity } from './base.js';
import { Entity, OneToMany, Property } from '@mikro-orm/core';
import { Cliente } from './cliente.js';

@Entity()
export class Empleado extends BaseEntity {
  @Property({ nullable: false })
  nombre!: string;

  @Property({ nullable: false })
  apellido!: string;

  @OneToMany(() => Cliente, (cliente) => cliente.repartidor)
  clientes!: Cliente[];
}
