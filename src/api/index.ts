import { VercelRequest, VercelResponse } from '@vercel/node';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { dbConnection } from '../config/database';

// Importa tus rutas
import usuariosRoutes from '../routes/usuarios.routes';
import perfilesRoutes from '../routes/perfiles.routes';
import parametrosConfiguracionesRoutes from '../routes/parametrosConfiguraciones.routes';
import itemsMenuRoutes from '../routes/itemsMenu.routes';
import permisosRoutes from '../routes/permisos.routes';
import perfilesPermisosRoutes from '../routes/perfilesPermisos.routes';
import paisesRoutes from '../routes/paises.routes';
import provinciasRoutes from '../routes/provincias.routes';
import localidadesRoutes from '../routes/localidades.routes';
import tipoMovimientosRoutes from '../routes/tipoMovimientos.routes';
import tipoDocumentosRoutes from '../routes/tipoDocumentos.routes';
import entidadAsociadaRoutes from '../routes/entidadAsociada.routes';
import tipoArchivosRoutes from '../routes/tipoArchivos.routes';
import expensasRoutes from '../routes/expensas.routes';
import historicoExpensasRoutes from '../routes/historicoExpensas.routes';
import personasRoutes from '../routes/personas.routes';
import edificiosRoutes from '../routes/edificios.routes';
import edificiosEncargadosRoutes from '../routes/edificiosEncargados.routes';
import departamentosRoutes from '../routes/departamentos.routes';
import reclamosRoutes from '../routes/reclamos.routes';
import reclamosDepartamentosRoutes from '../routes/reclamosDepartamentos.routes';
import archivosRoutes from '../routes/archivos.routes';
import cajaMovimientosRoutes from '../routes/cajaMovimientos.routes';
import espaciosComunesRoutes from '../routes/espaciosComunes.routes';
import anunciosRoutes from '../routes/anuncios.routes';
import actasReunionesRoutes from '../routes/actasReuniones.routes';
import reservasRoutes from '../routes/reservas.routes';
import participantesReunionesRoutes from '../routes/participantesReuniones.routes';

// Configuración de variables de entorno
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Conectar a la base de datos (solo una vez)
dbConnection();

// Registrar rutas
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/perfiles', perfilesRoutes);
app.use('/api/parametros-configuracion', parametrosConfiguracionesRoutes);
app.use('/api/items-menu', itemsMenuRoutes);
app.use('/api/permisos', permisosRoutes);
app.use('/api/perfiles-permisos', perfilesPermisosRoutes);
app.use('/api/paises', paisesRoutes);
app.use('/api/provincias', provinciasRoutes);
app.use('/api/localidades', localidadesRoutes);
app.use('/api/tipo-movimientos', tipoMovimientosRoutes);
app.use('/api/tipo-documentos', tipoDocumentosRoutes);
app.use('/api/entidad-asociada', entidadAsociadaRoutes);
app.use('/api/tipo-archivos', tipoArchivosRoutes);
app.use('/api/expensas', expensasRoutes);
app.use('/api/historico-expensas', historicoExpensasRoutes);
app.use('/api/personas', personasRoutes);
app.use('/api/edificios', edificiosRoutes);
app.use('/api/edificios-encargados', edificiosEncargadosRoutes);
app.use('/api/departamentos', departamentosRoutes);
app.use('/api/reclamos', reclamosRoutes);
app.use('/api/reclamos-departamentos', reclamosDepartamentosRoutes);
app.use('/api/archivos', archivosRoutes);
app.use('/api/caja-movimientos', cajaMovimientosRoutes);
app.use('/api/espacios-comunes', espaciosComunesRoutes);
app.use('/api/anuncios', anunciosRoutes);
app.use('/api/actas-reuniones', actasReunionesRoutes);
app.use('/api/reservas', reservasRoutes);
app.use('/api/participantes-reuniones', participantesReunionesRoutes);

app.get('/api/ping', (req, res) => {
  res.json({ ok: true, msg: 'pong' });
});

// Exportar como función para que Vercel lo maneje
export default (req: VercelRequest, res: VercelResponse) => {
  app(req as any, res as any);
};
