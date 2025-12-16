import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import {
  clienteBaseSchema,
  updateClienteSchema,
  idParameter,
  clienteResponseSchema,
  findAllClientesResponse,
  errorResponseSchema,
  successMessageSchema,
} from '../schemas/cliente.schema.js';
// Extend Zod with OpenAPI functionality
extendZodWithOpenApi(z);

// Create the clienteRegistry
export const clienteRegistry = new OpenAPIRegistry();

// Register schemas
clienteRegistry.register('CreateCliente', clienteBaseSchema);
clienteRegistry.register('UpdateCliente', updateClienteSchema);
clienteRegistry.register('ClienteResponse', clienteResponseSchema);
clienteRegistry.register('FindAllClientesResponse', findAllClientesResponse);
clienteRegistry.register('ErrorResponse', errorResponseSchema);
clienteRegistry.register('SuccessMessage', successMessageSchema);
clienteRegistry.register('IdParam', idParameter);
// ==================== POST METHODS ====================

// POST /api/cliente
clienteRegistry.registerPath({
  method: 'post',
  path: '/api/cliente',
  description: 'Crear una nuevo cliente',
  summary: 'Crear cliente',
  tags: ['Clientes'],
  request: {
    body: {
      description: 'Datos de el cliente a crear',
      content: {
        'application/json': {
          schema: clienteBaseSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: 'Cliente creada exitosamente',
      content: {
        'application/json': {
          schema: z.object({
            message: z
              .string()
              .openapi({ example: 'Cliente creada exitosamente' }),
            data: clienteResponseSchema,
          }),
        },
      },
    },
    400: {
      description: 'Error de validación',
      content: {
        'application/json': {
          schema: errorResponseSchema,
        },
      },
    },
    409: {
      description: 'Conflicto - el cliente ya existe',
      content: {
        'application/json': {
          schema: z.object({
            error: z.string().openapi({ example: 'ZONA_ALREADY_EXISTS' }),
            message: z.string().openapi({
              example: 'Ya existe una cliente con esa descripción',
            }),
          }),
        },
      },
    },
    500: {
      description: 'Error interno del servidor',
      content: {
        'application/json': {
          schema: errorResponseSchema,
        },
      },
    },
  },
});

// ==================== GET METHODS ====================

// GET /api/cliente
clienteRegistry.registerPath({
  method: 'get',
  path: '/api/cliente',
  description: 'Obtener todas els clientes con sus usuarios asociados',
  summary: 'Listar todas els clientes completas',
  tags: ['Clientes'],
  request: {},
  responses: {
    200: {
      description:
        'Lista de clientes con usuarios asociados obtenida exitosamente',
      content: {
        'application/json': {
          schema: findAllClientesResponse,
        },
      },
    },
    500: {
      description: 'Error interno del servidor',
      content: {
        'application/json': {
          schema: errorResponseSchema,
        },
      },
    },
  },
});

// GET /api/cliente/{id}
clienteRegistry.registerPath({
  method: 'get',
  path: '/api/cliente/{id}',
  description:
    'Obtener una cliente específica por ID con sus usuarios asociados',
  summary: 'Obtener cliente por ID',
  tags: ['Clientes'],
  request: {
    params: idParameter,
  },
  responses: {
    200: {
      description: 'Cliente encontrado exitosamente',
      content: {
        'application/json': {
          schema: z.object({
            message: z.string().openapi({ example: 'found one cliente' }),
            data: clienteResponseSchema,
          }),
        },
      },
    },
    404: {
      description: 'Cliente no encontrado',
      content: {
        'application/json': {
          schema: z.object({
            message: z.string().openapi({ example: 'Cliente no encontrado' }),
          }),
        },
      },
    },
    500: {
      description: 'Error interno del servidor',
      content: {
        'application/json': {
          schema: errorResponseSchema,
        },
      },
    },
  },
});

// ==================== PUT METHODS ====================

// PUT /api/cliente/{id}
clienteRegistry.registerPath({
  method: 'put',
  path: '/api/cliente/{id}',
  description: 'Actualizar información de una cliente',
  summary: 'Actualizar cliente',
  tags: ['Clientes'],
  request: {
    params: idParameter,
    body: {
      description: 'Datos de el cliente a actualizar',
      content: {
        'application/json': {
          schema: updateClienteSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Cliente actualizada exitosamente',
      content: {
        'application/json': {
          schema: z.object({
            message: z.string().openapi({ example: 'updated cliente' }),
            data: clienteResponseSchema,
          }),
        },
      },
    },
    400: {
      description: 'Error de validación',
      content: {
        'application/json': {
          schema: errorResponseSchema,
        },
      },
    },
    404: {
      description: 'Cliente no encontrado',
      content: {
        'application/json': {
          schema: z.object({
            message: z.string().openapi({ example: 'Cliente no encontrado' }),
          }),
        },
      },
    },
    409: {
      description: 'Conflicto - descripción ya existe',
      content: {
        'application/json': {
          schema: z.object({
            error: z
              .string()
              .openapi({ example: 'DESCRIPCION_ALREADY_EXISTS' }),
            message: z.string().openapi({
              example: 'Ya existe una cliente con esa descripción',
            }),
          }),
        },
      },
    },
    500: {
      description: 'Error interno del servidor',
      content: {
        'application/json': {
          schema: errorResponseSchema,
        },
      },
    },
  },
});

// ==================== DELETE METHODS ====================

// DELETE /api/cliente/{id}
clienteRegistry.registerPath({
  method: 'delete',
  path: '/api/cliente/{id}',
  description: 'Eliminar una cliente',
  summary: 'Eliminar cliente',
  tags: ['Clientes'],
  request: {
    params: idParameter,
  },
  responses: {
    200: {
      description: 'Cliente eliminada exitosamente',
      content: {
        'application/json': {
          schema: z.object({
            message: z.string().openapi({ example: 'deleted cliente' }),
            data: clienteResponseSchema,
          }),
        },
      },
    },
    404: {
      description: 'Cliente no encontrado',
      content: {
        'application/json': {
          schema: z.object({
            message: z.string().openapi({ example: 'Cliente no encontrado' }),
          }),
        },
      },
    },
    409: {
      description: 'Conflicto - el cliente tiene usuarios asociados',
      content: {
        'application/json': {
          schema: z.object({
            error: z.string().openapi({ example: 'ZONA_HAS_USERS' }),
            message: z.string().openapi({
              example:
                'No se puede eliminar el cliente porque tiene usuarios asociados',
            }),
          }),
        },
      },
    },
    500: {
      description: 'Error interno del servidor',
      content: {
        'application/json': {
          schema: errorResponseSchema,
        },
      },
    },
  },
});
