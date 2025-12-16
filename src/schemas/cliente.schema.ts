import z, { object } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z);
export const clienteBaseSchema = z.object({
  nombre: z
    .string()
    .min(1, 'El nombre es obligatorio')
    .min(2, 'El nombre debe tener más de 2 letras')
    .max(50)
    .optional(),
  apellido: z
    .string()
    .min(1, 'El apellido es obligatorio')
    .min(2, 'El apellido debe tener más de 2 letras')
    .max(50)
    .optional(),
  direccion: z.string().min(1, 'La dirección es obligatoria').max(200),
  indicacion: z.string().max(200).optional(),
  telefono: z.string().min(1, 'El teléfono es obligatorio').max(20).optional(),
  email: z.email('El email no es válido').max(100).optional(),
  cuit: z
    .string()
    .min(11, 'El CUIT debe tener 11 caracteres')
    .max(11, 'El CUIT debe tener 11 caracteres')
    .optional(),
  nombreFantasia: z
    .string()
    .min(2, 'El nombre de fantasía debe tener más de 2 letras')
    .max(100)
    .optional(),

  idRepartidor: z
    .int('El idRepartidor debe ser un número entero')
    .min(0, 'El idRepartidor no puede ser negativo')
    .optional(),
});

export const idParameter = z.object({
  id: z
    .number()
    .int('El id debe ser un número entero')
    .min(0, 'El id debe ser positivo'),
});

export const updateClienteSchema = clienteBaseSchema.partial(); //Hace que sean opcionales los campos

export const clienteResponseSchema = clienteBaseSchema.extend({
  id: z
    .number()
    .int('El id debe ser un número entero')
    .min(0, 'El id debe ser positivo'),
});

export const findAllClientesResponse = z.object({
  message: z.string().openapi({ example: 'found all clientes' }),
  data: z.array(clienteResponseSchema),
});

export const errorResponseSchema = z.object({
  message: z.string().describe('Mensaje de error').openapi({
    example: 'Validation failed',
  }),
  errors: z
    .array(
      z.object({
        field: z.string().describe('Campo que falló').openapi({
          example: 'descripcionZona',
        }),
        message: z.string().describe('Mensaje de error').openapi({
          example: 'Descripción inválida',
        }),
      })
    )
    .optional()
    .describe('Detalles de errores de validación'),
});
export const successMessageSchema = z.object({
  message: z.string().describe('Mensaje de éxito').openapi({
    example: 'Operación completada exitosamente',
  }),
});
