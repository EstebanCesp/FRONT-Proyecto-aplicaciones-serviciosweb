import { Router } from "express";
import { getRedDocente, createRedDocente, updateRedDocente, deleteRedDocente } from "../controllers/redDocenteController";

const router = Router();

router.get("/red-docente", getRedDocente);
router.post("/red-docente", createRedDocente);
router.put("/red-docente/:id", updateRedDocente);
router.delete("/red-docente/:id", deleteRedDocente);

export default router;