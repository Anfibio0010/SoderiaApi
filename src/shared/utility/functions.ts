type clienteProps = {
  id: number;
  nombre?: string;
  apellido?: string;
  direccion: string;
  indicacion?: string;
  telefono: string;
  email?: string;
  cuit?: string;
  nombreFantasia?: string;
  idRepartidor?: number;
};
export function checkClienteOrEmpresa(cliente: clienteProps) {
  if (cliente.cuit && cliente.email && cliente.nombreFantasia) {
    return {
      tipo: 'empresa',
      datos: cliente,
    };
  } else {
    return {
      tipo: 'cliente',
      datos: cliente,
    };
  }
}
