import { Router } from "express";
import { getRedes, createRed, updateRed, deleteRed } from "../controllers/redController";

const router = Router();

router.get("/redes", getRedes);
router.post("/redes", createRed);
router.put("/redes/:idr", updateRed);
router.delete("/redes/:idr", deleteRed);

export default router;