import { OneToMany,ManyToOne Property, Entity, PrimaryKeyProp } from "@mikro-orm/core";
import { Reparto } from "./reparto.js";
import { Producto } from "./producto.js";
import { nullable } from "zod";
@Entity()
export class RepartoProducto {
 @ManyToOne({ primary: true })
 reparto: Reparto;

  @ManyToOne({ primary: true })
  producto: Producto;

  @Property({ nullable: false })
  carga!: number;
  
  @Property({ nullable: false })
  sobra!: number;
  [PrimaryKeyProp]?: ['reparto', 'producto'];
}
