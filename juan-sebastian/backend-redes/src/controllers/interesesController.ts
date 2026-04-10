import { connectDB } from "../db";

// GET
export const getIntereses = async (req: any, res: any) => {
    try {
        const pool = await connectDB();
        const result = await pool.request().query("SELECT * FROM Intereses_futuros");
        res.json(result.recordset);
    } catch (error: any) {
        console.error("ERROR GET:", error);
        res.status(500).json({ error: error.message });
    }
};

// POST
export const createInteres = async (req: any, res: any) => {
    const { docente, termino_clave } = req.body;

    try {
        const pool = await connectDB();
        await pool.request()
            .input("docente", docente)
            .input("termino_clave", termino_clave)
            .query(`
                INSERT INTO Intereses_futuros (docente, termino_clave)
                VALUES (@docente, @termino_clave)
            `);

        res.json({ message: "Interés creado" });
    } catch (error: any) {
        console.error("ERROR POST:", error);
        res.status(500).json({ error: error.message });
    }
};

//ACTUALIZAR INTERES

export const updateInteres = async (req: any, res: any) => {
    const { id } = req.params;
    const { docente, termino_clave } = req.body;

    try {
        const pool = await connectDB();
        await pool.request()
            .input("id", id)
            .input("docente", docente)
            .input("termino_clave", termino_clave)
            .query(`
                UPDATE Intereses_futuros
                SET docente = @docente,
                    termino_clave = @termino_clave
                WHERE id = @id
            `);

        res.json({ message: "Interés actualizado" });
    } catch (error: any) {
        console.error("ERROR UPDATE:", error);
        res.status(500).json({ error: error.message });
    }
};

//AGREGAMOS EL DELETE DE LA TABLA INTERESES

export const deleteInteres = async (req: any, res: any) => {
    const { id } = req.params;

    try {
        const pool = await connectDB();
        await pool.request()
            .input("id", id)
            .query("DELETE FROM Intereses_futuros WHERE id = @id");

        res.json({ message: "Interés eliminado" });
    } catch (error: any) {
        console.error("ERROR DELETE:", error);
        res.status(500).json({ error: error.message });
    }
};