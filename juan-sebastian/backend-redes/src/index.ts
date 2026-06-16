// INDEX.TS
import { connectDB } from "./db";
import redRoutes from "./routes/redRoutes";
import redDocenteRoutes from "./routes/redDocenteRoutes";
//agregamos el import de la tabla intereses
import interesesRoutes from "./routes/interesesRoutes";

//agregamos el import de la tabla beca
import becaRoutes from "./routes/becaRoutes";

import express from "express";
import cors from "cors";

const app = express(); // Servidor
app.use(cors()); // Permite conexión desde Angular
app.use(express.json()); // Permite recibir JSON
app.use("/api", redRoutes); // rutas de la api, ruta red
// rutas de la api, ruta red-docente
app.use("/api", redDocenteRoutes);
// rutas de la tabla intereses
app.use("/api", interesesRoutes);

// rutas de la tabla beca
app.use("/api", becaRoutes);

// Ruta de prueba
app.get("/", (req, res) => {
    res.send("API funcionando "); 
});
connectDB();
// Puerto
app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});