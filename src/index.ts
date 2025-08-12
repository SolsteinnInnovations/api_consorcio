import app from './app';

const port = process.env.PORT || 3000; // Define el puerto, usa 3000 por defecto

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
    console.log(`http://localhost:${port}`);
});