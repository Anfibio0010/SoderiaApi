import { Router } from 'express';
import {
  validateBody,
  validateParams,
  validateQuery,
} from './../shared/utility/apiMiddleware.js';
import {
  //se importan los schemas de los endpoints
  clienteBaseSchema,
  idParameter,
  updateClienteSchema,
} from './../schemas/cliente.schema.js';
import {
  findAll,
  findOne,
  add,
  update,
  remove,
  //se importan los métodos de los endpoints del controller
} from './../controller/cliente.controller.js';

export const zonaRouter = Router();

// ==================== POST ROUTES ====================
zonaRouter.post('/', validateBody(clienteBaseSchema), add);

// ==================== GET ROUTES ====================

zonaRouter.get('/:id', validateParams(idParameter), findOne);

zonaRouter.get('/', findAll);
// ==================== PUT ROUTES ====================
zonaRouter.put(
  '/:id',
  validateParams(idParameter),
  validateBody(updateClienteSchema),
  update
);

// ==================== PATCH ROUTES ====================
zonaRouter.patch(
  '/:id',
  validateParams(idParameter),
  validateBody(updateClienteSchema),
  update
);

// ==================== DELETE ROUTES ====================
zonaRouter.delete('/:id', validateParams(idParameter), remove);
