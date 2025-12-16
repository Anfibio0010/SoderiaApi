import z from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z);
export const repartoBaseSchema = z.object({
  repartidor: z
    .int('El idRepartidor debe ser un número entero')
    .min(0, 'El idRepartidor no puede ser negativo'),
  fecha: z.iso.date().refine((value) => value >= '2025-12-15', {
    message: 'La fecha debe ser posterior al 15 de diciembre de 2025',
  }),
  abonox12: z
    .int('El abonox12 debe ser un número')
    .min(0, 'El abonox12 no puede ser negativo'),
  abonox20: z
    .int('El abonox20 debe ser un número')
    .min(0, 'El abonox20 no puede ser negativo'),
  descartex12: z
    .int('El descartex12 debe ser un número')
    .min(0, 'El descartex12 no puede ser negativo'),
  descartex20: z
    .int('El descartex20 debe ser un número')
    .min(0, 'El descartex20 no puede ser negativo'),
  efectivo: z
    .int('El efectivo debe ser un número')
    .min(0, 'El efectivo no puede ser negativo'),
  transferencia: z
    .int('La transferencia debe ser un número')
    .min(0, 'La transferencia no puede ser negativa'),
  gastos: z
    .int('Los gastos deben ser un número')
    .min(0, 'Los gastos no pueden ser negativos'),
  ctaCte: z
    .int('La ctaCte debe ser un número')
    .min(0, 'La ctaCte no puede ser negativa'),
  pagoEmpresas: z
    .number('El pagoEmpresas debe ser un número')
    .min(0, 'El pagoEmpresas no puede ser negativo'),
});
