const express = require('express');

const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');
const { createCategory, updateCategory, getCategory, getAllCategories, deleteCategory } = require('../controllers/blogCategoryCtrl');

const router = express.Router();

router.post("/", authMiddleware, isAdmin, createCategory);
router.put("/:id", authMiddleware, isAdmin, updateCategory);
router.get("/:id", getCategory);
router.get("/", getAllCategories);
router.delete("/:id", authMiddleware, isAdmin, deleteCategory);

module.exports = router;