const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongoDbId");
const ProdCategory = require("../models/prodCategoryModel");

const createCategory = asyncHandler(async (req, res) => {
    try {
        const newCategory = await ProdCategory.create(req.body);
        res.json(newCategory);
    } catch (error) {
        throw new Error(error);
    }
})

const updateCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const updatedCategory = await ProdCategory.findByIdAndUpdate(id, req.body, { new: true, });
        res.json(updatedCategory);
    } catch (error) {
        throw new Error(error);
    }
})

const deleteCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const deletedCategory = await ProdCategory.findByIdAndDelete(id);
        res.json(deletedCategory);
    } catch (error) {
        throw new Error(error);
    }
})

const getCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const getaCategory = await ProdCategory.findById(id);
        res.json(getaCategory);
    } catch (error) {
        throw new Error(error);
    }
})

const getAllCategories = asyncHandler(async (req, res) => {
    try {
        const allCategories = await ProdCategory.find();
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