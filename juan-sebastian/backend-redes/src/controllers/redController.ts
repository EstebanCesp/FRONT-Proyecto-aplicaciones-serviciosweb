import { connectDB } from "../db";

// OBTENER TODAS LAS REDES
export const getRedes = async (req: any, res: any) => {
    try {
        const pool = await connectDB();
        const result = await pool.request().query("SELECT * FROM Red");
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener redes" });
    }
};

// CREAR UNA RED
export const createRed = async (req: any, res: any) => {
    const { nombre, url, pais } = req.body;

    try {
        const pool = await connectDB();
        await pool
            .request()
            //.input("idr", idr)
            .input("nombre", nombre)
            .input("url", url)
            .input("pais", pais)
            .query(
                "INSERT INTO Red (nombre, url, pais) VALUES (@nombre, @url, @pais)"
            );

        res.json({ message: "Red creada correctamente" });
    } catch (error: any) {
         console.error("ERROR REAL:", error);
        res.status(500).json({ error: error.message });
    }
};

//actualizar una red
export const updateRed = async (req: any, res: any) => {
    const { idr } = req.params;
    const { nombre, url, pais } = req.body;

    try {
        const pool = await connectDB();
        await pool
            .request()
            .input("idr", idr)
            .input("nombre", nombre)
            .input("url", url)
            .input("pais", pais)
            .query(`
                UPDATE Red 
                SET nombre = @nombre, url = @url, pais = @pais
                WHERE idr = @idr
            `);

        res.json({ message: "Red actualizada correctamente" });
    } catch (error: any) {
    console.error("ERROR REAL UPDATE:", error);
    res.status(500).json({ error: error.message });
}
};

export const deleteRed = async (req: any, res: any) => {
    const { idr } = req.params;

    try {
        const pool = await connectDB();
        await pool
            .request()
            .input("idr", idr)
            .query("DELETE FROM Red WHERE idr = @idr");

        res.json({ message: "Red eliminada correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar red" });
    }
};

//