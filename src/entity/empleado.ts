import { BaseEntity } from './base.js';
import { Entity, Property } from '@mikro-orm/core';

@Entity()
export class Empleado extends BaseEntity {
  @Property({ nullable: false })
  nombre!: string;

  @Property({ nullable: false })
  apellido!: string;
}
