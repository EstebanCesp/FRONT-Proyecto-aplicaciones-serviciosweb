const sql = require("mssql/msnodesqlv8");

const config = {
    connectionString: "Driver={ODBC Driver 17 for SQL Server};Server=DESKTOP-8D3KGB0\\SQLEXPRESS;Database=proyecto_web;Trusted_Connection=yes;"
};

export const connectDB = async () => {
    try {
        const pool = await sql.connect(config);
        console.log("Conectado a SQL Server ");
        return pool;
    } catch (error) {
        console.error("Error de conexión:", error);
    }
};






// const sql = require("mssql/msnodesqlv8");

// const config = {
//     server: "DESKTOP-8D3KGB0\\SQLEXPRESS",
//     database: "proyecto_C",
//     driver: "msnodesqlv8",
//     options: {
//         trustedConnection: true
//     }
// };

// export const connectDB = async () => {
//     try {
//         const pool = await sql.connect(config);
//         console.log("Conectado a SQL Server ");
//         return pool;
//     } catch (error) {
//         console.error("Error de conexión:", error);
//     }
// };



//server: "DESKTOP-8D3KGB0\\SQLEXPRESS",