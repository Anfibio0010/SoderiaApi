import 'reflect-metadata'; // Importar reflect-metadata al inicio de la aplicación
import express from 'express';
import { orm, syncSchema } from './shared/bd/orm'; // Importar la instancia de MikroORM y la función para sincronizar el esquema
import { RequestContext } from '@mikro-orm/core';
//import usuarioRouter from './usuario/usuario.route';
import { setupSwagger } from './swagger.setup'; // ✅ AGREGAR ESTA LÍNEA

const app = express(); // Crear una instancia de una aplicación Express es una funcion
app.use(express.json()); // Middleware para parsear JSON en las solicitudes entrantes

// ✅ PRIMERO: Crear el contexto de MikroORM para cada solicitud
app.use((req, res, next) => {
  RequestContext.create(orm.em, next); // Crear un contexto de solicitud para MikroORM en cada solicitud de entidad
});

// ✅ DESPUÉS: Usar las rutas que necesitan acceso a la base de datos
//app.use('/api', usuarioRouter);

// ✅ CONFIGURAR SWAGGER ANTES DE LA RUTA RAÍZ
await setupSwagger(app);

app.use('/', (req, res) => {
  res.json('Hola, mundo desde Express con TypeScript!');
});

await syncSchema(); // Sincronizar el esquema de la base de datos al iniciar la aplicación NUNCA EN PRODUCCION

app.listen(3000, () => {
  console.log('Servidor escuchando en http://localhost:3000');
  console.log('📚 Swagger UI disponible en: http://localhost:3000/api-docs');
}); // El servidor escucha en el puerto 3000 y muestra un mensaje en la consola cuando está listo
