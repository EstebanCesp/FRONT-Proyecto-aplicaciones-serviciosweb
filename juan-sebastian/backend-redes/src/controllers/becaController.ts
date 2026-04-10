import { connectDB } from "../db";

// GET
export const getBecas = async (req: any, res: any) => {
    try {
        const pool = await connectDB();
        const result = await pool.request().query("SELECT * FROM Beca");
        res.json(result.recordset);
    } catch (error: any) {
        console.error("ERROR GET:", error);
        res.status(500).json({ error: error.message });
    }
};

// POST
export const createBeca = async (req: any, res: any) => {
    const { estudios, tipo, institucion, fecha_inicio, fecha_fin } = req.body;

    try {
        const pool = await connectDB();
        await pool.request()
            .input("estudios", estudios)
            .input("tipo", tipo)
            .input("institucion", institucion)
            .input("fecha_inicio", fecha_inicio)
            .input("fecha_fin", fecha_fin)
            .query(`
                INSERT INTO Beca (estudios, tipo, institucion, fecha_inicio, fecha_fin)
                VALUES (@estudios, @tipo, @institucion, @fecha_inicio, @fecha_fin)
            `);

        res.json({ message: "Beca creada" });
    } catch (error: any) {
        console.error("ERROR POST:", error);
        res.status(500).json({ error: error.message });
    }
};

// PUT
export const updateBeca = async (req: any, res: any) => {
    const { id } = req.params;
    const { estudios, tipo, institucion, fecha_inicio, fecha_fin } = req.body;

    try {
        const pool = await connectDB();
        await pool.request()
            .input("id", id)
            .input("estudios", estudios)
            .input("tipo", tipo)
            .input("institucion", institucion)
            .input("fecha_inicio", fecha_inicio)
            .input("fecha_fin", fecha_fin)
            .query(`
                UPDATE Beca
                SET estudios = @estudios,
                    tipo = @tipo,
                    institucion = @institucion,
                    fecha_inicio = @fecha_inicio,
                    fecha_fin = @fecha_fin
                WHERE id = @id
            `);

        res.json({ message: "Beca actualizada" });
    } catch (error: any) {
        console.error("ERROR UPDATE:", error);
        res.status(500).json({ error: error.message });
    }
};

// DELETE
export const deleteBeca = async (req: any, res: any) => {
    const { id } = req.params;

    try {
        const pool = await connectDB();
        await pool.request()
            .input("id", id)
            .query("DELETE FROM Beca WHERE id = @id");

        res.json({ message: "Beca eliminada" });
    } catch (error: any) {
        console.error("ERROR DELETE:", error);
        res.status(500).json({ error: error.message });
    }
};