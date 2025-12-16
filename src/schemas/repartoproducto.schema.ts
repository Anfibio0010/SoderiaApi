import z from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
extendZodWithOpenApi(z);
export const repartoProductoBaseSchema = z.object({
  carga: z
    .int('La carga debe ser un número entero')
    .min(0, 'La carga no puede ser negativa'),

  sobra: z
    .int('La sobra debe ser un número entero')
    .min(0, 'La sobra no puede ser negativa'),
  //!Ahora defino la clave foránea de reparto que es compuesta
  idRepartidorReparto: z
    .int('El idRepartidorReparto debe ser un número entero')
    .min(0, 'El idRepartidorReparto no puede ser negativo'),
  fechaReparto: z.iso.date().refine((value) => value >= '2025-12-15', {
    message: 'La fecha debe ser posterior al 15 de diciembre de 2025',
  }),
  //!Ahora defino la clave foránea de producto
  idProducto: z
    .int('El idProducto debe ser un número entero')
    .min(0, 'El idProducto no puede ser negativo'),
});
