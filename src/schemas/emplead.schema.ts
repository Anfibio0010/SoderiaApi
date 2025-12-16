import z from 'zod';
export const empleadoBaseSchema = z.object({
  nombre: z
    .string()
    .min(1, 'El nombre es obligatorio')
    .min(2, 'El nombre debe tener más de 2 letras')
    .max(50),
  apellido: z
    .string()
    .min(1, 'El apellido es obligatorio')
    .min(2, 'El apellido debe tener más de 2 letras')
    .max(50),
  clientes: z.array(z.number().int().min(0)).optional(), // Asumiendo que los clientes se representan por sus IDs
});
