import { Router } from "express";
import { getBecas, createBeca, updateBeca, deleteBeca } from "../controllers/becaController";

const router = Router();

router.get("/becas", getBecas);
router.post("/becas", createBeca);
router.put("/becas/:id", updateBeca);
router.delete("/becas/:id", deleteBeca);

export default router;