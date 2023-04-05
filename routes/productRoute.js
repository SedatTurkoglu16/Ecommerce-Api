const express = require('express');

const { 
    createProduct, getaProduct, getAllProducts, updateProduct, deleteProduct, addToWishlist, rating
} = require('../controllers/productCtrl');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post("/", authMiddleware, isAdmin, createProduct);
router.get("/", getAllProducts);
router.delete("/:id", authMiddleware, isAdmin, deleteProduct);

router.put("/wishlist", authMiddleware, addToWishlist);
router.put("/rating", authMiddleware, rating);
router.get("/:id", getaProduct);
router.put("/:id", authMiddleware, isAdmin, updateProduct);

module.exports = router;