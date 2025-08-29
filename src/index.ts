import app from './app';
import dotenv from 'dotenv';

dotenv.config(); // Asegúrate de que dotenv esté configurado para cargar las variables

const port = process.env.PORT || 3001; // Define el puerto, usa 3000 por defecto

app.listen(port, () => {
 
    console.log(`Servidor corriendo en el puerto ${port}`);
    console.log(`http://localhost:${port}`);
});