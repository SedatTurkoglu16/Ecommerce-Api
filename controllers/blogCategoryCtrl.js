const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongoDbId");
const BlogCategory = require("../models/blogCategoryModel");

const createCategory = asyncHandler(async (req, res) => {
    try {
        const newCategory = await BlogCategory.create(req.body);
        res.json(newCategory);
    } catch (error) {
        throw new Error(error);
    }
})

const updateCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const updatedCategory = await BlogCategory.findByIdAndUpdate(id, req.body, { new: true, });
        res.json(updatedCategory);
    } catch (error) {
        throw new Error(error);
    }
})

const deleteCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const deletedCategory = await BlogCategory.findByIdAndDelete(id);
        res.json(deletedCategory);
    } catch (error) {
        throw new Error(error);
    }
})

const getCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const getaCategory = await BlogCategory.findById(id);
        res.json(getaCategory);
    } catch (error) {
        throw new Error(error);
    }
})

const getAllCategories = asyncHandler(async (req, res) => {
    try {
        const allCategories = await BlogCategory.find();
        res.json(allCategories);
    } catch (error) {
        throw new Error(error);
    }
})

module.exports = { 
    createCategory, 
    updateCategory, 
    deleteCategory, 
    getCategory,
    getAllCategories, 
};