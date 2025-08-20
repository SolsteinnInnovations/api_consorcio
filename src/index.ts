import app from './app';
import dotenv from 'dotenv';

dotenv.config(); // Asegúrate de que dotenv esté configurado para cargar las variables

const port = process.env.PORT || 3000; // Define el puerto, usa 3000 por defecto

app.listen(port, () => {
    console.log("Puerto env: " + process.env.PORT);
    console.log("Puero env: " + process.env.JWT_SECRET);
    console.log(`Servidor corriendo en el puerto ${port}`);
    console.log(`http://localhost:${port}`);
});