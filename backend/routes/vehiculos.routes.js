import { Router } from "express";
const router = Router();

// POST /api/vehiculos/registro
router.post("/registro", (req, res) => {
    const { placa, modelo, tipo } = req.body;

    if (!placa || !modelo || !tipo) {
        return res.status(400).json({ message: "Faltan datos" });
    }

    res.status(201).json({
        message: "Vehículo registrado correctamente",
        datos: { placa, modelo, tipo }
    });
});

export default router;
