import { Request, Response, NextFunction } from 'express';
import { Cliente } from '../entity/cliente.js';
import { orm } from '../shared/bd/orm.js';
//import { getOauth } from '../usuario/usuario.controler.js';
import { checkClienteOrEmpresa } from '../shared/utility/functions.js';
const em = orm.em;

interface AuthRequest extends Request {
  user?: {
    id: string;
    rol: string;
    email: string;
  };
}
async function findAll(req: Request, res: Response) {
  try {
    const cliente = await em.find(Cliente, {});

    res.status(200).json({
      message: 'found all Clientes',
      data: cliente,
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Error interno del servidor',
      error: error.message,
    });
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const { id } = req.params; // Already validated as string that matches /^\d+$/
    const codCliente = Number.parseInt(id);

    const cli = await em.findOneOrFail(Cliente, { id: codCliente });

    res.status(200).json({
      message: 'found one cliente',
      data: cli,
    });
  } catch (error: any) {
    if (error.name === 'NotFoundError') {
      return res.status(404).json({
        message: 'Cliente no encontrado',
      });
    }
    res.status(500).json({
      message: 'Error interno del servidor',
      error: error.message,
    });
  }
}

async function add(req: Request, res: Response) {
  try {
    const clienteData = req.body; // Already validated by createClienteValidation schema

    // Check if zona with same descripcionCliente already exists
    const cliConTipo = checkClienteOrEmpresa(clienteData);
    if (cliConTipo.tipo === 'cliente') {
      const existingCliente = await em.findOne(Cliente, {
        nombre: clienteData.nombre,
        apellido: clienteData.apellido,
        telefono: clienteData.telefono,
      });
      if (existingCliente) {
        return res.status(409).json({
          error: 'CLIENTE_ALREADY_EXISTS',
          message: 'Ya existe un cliente con ese nombre, apellido y teléfono',
        });
      }
    } else {
      const existingEmpresa = await em.findOne(Cliente, {
        cuit: clienteData.cuit,
        nombreFantasia: clienteData.nombreFantasia,
      });
      if (existingEmpresa) {
        return res.status(409).json({
          error: 'EMPRESA_ALREADY_EXISTS',
          message: 'Ya existe una empresa con ese CUIT y nombre de fantasía',
        });
      }
    }
    const cliente = em.create(Cliente, clienteData);
    await em.flush();

    res.status(201).json({
      message: 'Cliente creado exitosamente',
      data: cliente,
    });
  } catch (error: any) {
    console.error('Error creating cliente:', error);
    res.status(500).json({
      message: 'Error interno del servidor',
      error: error.message,
    });
  }
}

async function update(req: Request, res: Response) {
  try {
    const { id } = req.params; // Already validated
    const updateData = req.body; // Already validated by updateClienteValidation schema
    const codCliente = Number.parseInt(id);

    const clienteToUpdate = await em.findOneOrFail(Cliente, { id: codCliente });

    const cliConTipo = checkClienteOrEmpresa(updateData);
    if (cliConTipo.tipo === 'cliente') {
      const existingCliente = await em.findOne(Cliente, {
        nombre: updateData.nombre,
        apellido: updateData.apellido,
        telefono: updateData.telefono,
      });
      if (existingCliente) {
        return res.status(409).json({
          error: 'CLIENTE_ALREADY_EXISTS',
          message: 'Ya existe un cliente con ese nombre, apellido y teléfono',
        });
      }
    } else {
      const existingEmpresa = await em.findOne(Cliente, {
        cuit: updateData.cuit,
        nombreFantasia: updateData.nombreFantasia,
      });
      if (existingEmpresa) {
        return res.status(409).json({
          error: 'EMPRESA_ALREADY_EXISTS',
          message: 'Ya existe una empresa con ese CUIT y nombre de fantasía',
        });
      }
    }
    em.assign(clienteToUpdate, updateData);
    await em.flush();

    res.status(200).json({
      message: 'updated cliente',
      data: clienteToUpdate,
    });
  } catch (error: any) {
    if (error.name === 'NotFoundError') {
      return res.status(404).json({
        message: 'Cliente no encontrado',
      });
    }

    console.error('Error updating cliente:', error);
    res.status(500).json({
      message: 'Error interno del servidor',
      error: error.message,
    });
  }
}

async function remove(req: Request, res: Response) {
  try {
    const { id } = req.params; // Already validated
    const codCliente = Number.parseInt(id);

    const cliente = await em.findOneOrFail(Cliente, { id: codCliente });

    // Check if zona has associated users before deleting

    await em.removeAndFlush(cliente);

    res.status(200).json({
      message: 'deleted cliente',
      data: cliente,
    });
  } catch (error: any) {
    if (error.name === 'NotFoundError') {
      return res.status(404).json({
        message: 'Cliente no encontrada',
      });
    }

    console.error('Error deleting cliente:', error);
    res.status(500).json({
      message: 'Error interno del servidor',
      error: error.message,
    });
  }
}
export { findAll, findOne, add, update, remove };
