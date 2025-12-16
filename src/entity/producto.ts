import { BaseEntity } from './base.js';
import { Entity, ManyToOne, OneToMany, Property } from '@mikro-orm/core';
import { RepartoProducto } from './reparto_producto.js';

@Entity()
export class Producto extends BaseEntity {
  @Property({ nullable: false })
  nombre!: string;
  @OneToMany(
    () => RepartoProducto,
    (repartoProducto) => repartoProducto.producto
  )
  productosRepartidos!: RepartoProducto[];
}
