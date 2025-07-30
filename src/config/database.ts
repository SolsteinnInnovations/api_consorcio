import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Asegúrate de que dotenv esté configurado para cargar las variables

const dbConnection = async () => {
    try {
        
        const dbUser = process.env.DB_USER;
        const dbPassword = process.env.DB_PASSWORD;
        const dbName = process.env.DB_NAME;
        const dbHost = 'cluser-consorcio.jwf7og2.mongodb.net'; // Esta parte de la URL generalmente es constante para tu clúster

        if (!dbUser || !dbPassword || !dbName) {
            throw new Error('Faltan variables de entorno para la conexión a la base de datos (DB_USER, DB_PASSWORD, DB_NAME)');
        }

        // Construye la cadena de conexión usando las variables de entorno
        const connectionString = `mongodb+srv://${dbUser}:${dbPassword}@${dbHost}/${dbName}`;

        await mongoose.connect(connectionString);

        console.log('DB Online');

    } catch (error) {
        console.error('Error al iniciar la DB:', error);
        throw new Error('Error al iniciar la DB');
    }
};

export { dbConnection };