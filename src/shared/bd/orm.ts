import { MikroORM } from '@mikro-orm/core';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';

export const orm = await MikroORM.init({
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  dbName: 'database.sqlite', // Poner la base de datos que se usa en este proyecto
  clientUrl: 'mysql://root:root@127.0.0.1:3306/soderia', // La URL de conexión a la base de datos
  highlighter: new SqlHighlighter(), // Resalta las consultas SQL en la consola para facilitar la lectura
  debug: true, // Habilita el modo de depuración para ver más detalles en los logs
  schemaGenerator: {
    // Solo se usa en el desarrollo de la aplicación, nunca en producción, ya que borra toda la información de la base de datos
    disableForeignKeys: true, // Se deshabilitan las claves foráneas al generar el esquema
    createForeignKeyConstraints: true, // Se crean las restricciones de claves foráneas
    ignoreSchema: [], // No se ignoran esquemas específicos
  },
});

export const syncSchema = async () => {
  const generator = orm.getSchemaGenerator();
  await generator.updateSchema();
  /*
  await generator.dropSchema();
  await generator.createSchema();
  */ // Para borrar todos los datos y crear el esquema desde cero
};
