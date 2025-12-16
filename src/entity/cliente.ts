import { BaseEntity } from './base.js';
import { Entity, ManyToOne, OneToMany, Property } from '@mikro-orm/core';
import { Empleado } from './empleado.js';

@Entity()
export class Cliente extends BaseEntity {
  @Property({ nullable: true })
  nombre!: string;
  @Property({ nullable: true })
  apellido!: string;
  @Property({ nullable: false })
  direccion!: string;
  @Property({ nullable: true })
  //* El propósito de este campo es indicar piso y departamento en el caso en que sea un edificio
  indicacion!: string;
  @Property({ nullable: true })
  telefono!: string;
  @Property({ nullable: true })
  email!: string;
  @Property({ nullable: true })
  cuit!: string;
  @Property({ nullable: true })
  nombreFantasia!: string;
  @ManyToOne(() => Empleado, { nullable: true })
  repartidor!: Empleado | null;

  //* Si el cliente tiene mail y cuit es una empresa
}
