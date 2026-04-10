import { Router } from "express";
import { getIntereses, createInteres, updateInteres, deleteInteres } from "../controllers/interesesController";


const router = Router();

router.get("/intereses", getIntereses);
router.post("/intereses", createInteres);

//CREAMOS LAS RUTAS DE ACTUALIZAR Y ELIMINAR INTERES

router.put("/intereses/:id", updateInteres);
router.delete("/intereses/:id", deleteInteres);

export default router;