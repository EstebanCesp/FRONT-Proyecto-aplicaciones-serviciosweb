import { connectDB } from "../db";

// GET
export const getRedDocente = async (req: any, res: any) => {
    try {
        const pool = await connectDB();
        const result = await pool.request().query("SELECT * FROM Red_docente");
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener datos" });
    }
};

// POST
export const createRedDocente = async (req: any, res: any) => {
    const { red, docente, fecha_inicio, fecha_fin, act_destacadas } = req.body;

    try {
        const pool = await connectDB();
        await pool
            .request()
            .input("red", red)
            .input("docente", docente)
            .input("fecha_inicio", fecha_inicio)
            .input("fecha_fin", fecha_fin)
            .input("act_destacadas", act_destacadas)
            .query(`
                INSERT INTO Red_docente 
                (red, docente, fecha_inicio, fecha_fin, act_destacadas)
                VALUES (@red, @docente, @fecha_inicio, @fecha_fin, @act_destacadas)
            `);

        res.json({ message: "Registro creado" });
    } catch (error: any) {
        console.error("ERROR REAL:", error);
        res.status(500).json({ error: error.message });
    }
};

// UPDATE DE LA RED DOCENTE

export const updateRedDocente = async (req: any, res: any) => {
    const { id } = req.params;
    const { red, docente, fecha_inicio, fecha_fin, act_destacadas } = req.body;

    try {
        const pool = await connectDB();
        await pool.request()
            .input("id", id)
            .input("red", red)
            .input("docente", docente)
            .input("fecha_inicio", fecha_inicio)
            .input("fecha_fin", fecha_fin)
            .input("act_destacadas", act_destacadas)
            .query(`
                UPDATE Red_docente
                SET red = @red,
                    docente = @docente,
                    fecha_inicio = @fecha_inicio,
                    fecha_fin = @fecha_fin,
                    act_destacadas = @act_destacadas
                WHERE id = @id
            `);

        res.json({ message: "Registro actualizado" });
    } catch (error: any) {
        console.error("ERROR UPDATE RD:", error);
        res.status(500).json({ error: error.message });
    }
};

// DELETE DE LA TABLA RED DOCENTE

export const deleteRedDocente = async (req: any, res: any) => {
    const { id } = req.params;

    try {
        const pool = await connectDB();
        await pool.request()
            .input("id", id)
            .query("DELETE FROM Red_docente WHERE id = @id");

        res.json({ message: "Registro eliminado" });
    } catch (error: any) {
        console.error("ERROR DELETE RD:", error);
        res.status(500).json({ error: error.message });
    }
};