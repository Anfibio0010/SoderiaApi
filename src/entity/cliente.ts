import { BaseEntity } from './base.js';
import { Entity, Property } from '@mikro-orm/core';

@Entity()
export class Cliente extends BaseEntity {
  @Property({ nullable: false })
  nombre!: string;
  @Property({ nullable: false })
  apellido!: string;
  @Property({ nullable: false })
  direccion!: string;
  @Property({ nullable: false })
  telefono!: string;
  @Property({ nullable: true })
  email!: string;
  @Property({ nullable: true })
  cuit!: string;

  //* Si el cliente tiene mail y cuit es una empresa
}
