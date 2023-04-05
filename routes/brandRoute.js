const express = require('express');

const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');
const { 
    createBrand, 
    updateBrand, 
    deleteBrand, 
    getBrand,
    getAllBrands,
 } = require('../controllers/brandCtrl');

const router = express.Router();

router.post("/", authMiddleware, isAdmin, createBrand);
router.put("/:id", authMiddleware, isAdmin, updateBrand);
router.get("/:id", getBrand);
router.get("/", getAllBrands);
router.delete("/:id", authMiddleware, isAdmin, deleteBrand);

module.exports = router;