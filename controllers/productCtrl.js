const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const validateMongoDbId = require("../utils/validateMongoDbId");
const slugify = require('slugify');

const createProduct = asyncHandler(async (req, res) => {
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title);
        }
        const newProduct = await Product.create(req.body);
        res.json(newProduct);
    } catch (error) {
        throw new Error(error)
    }
})

const getAllProducts = asyncHandler(async (req, res) => {
    try {

        //Filtering
        const queryObj = { ...req.query };
        const excludeFields = ["page", "sort", "limit", "fields"];
        excludeFields.forEach((el) => delete queryObj[el]);
        console.log(queryObj);
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

        let query = Product.find(JSON.parse(queryStr));

        //Sorting

        if(req.query.sort) {
            const sortBy = req.query.sort.split(",").join(" ");
            query = query.sort(sortBy);
        } else {
            query = query.sort("-createdAt");
        };

        //Limiting

        if(req.query.sort) {
            const fields = req.query.fields.split(",").join(" ");
            query = query.select(fields);
        } else {
            query = query.select("-__v");
        };

        //Pagination

        const page = req.query.page;
        const limit = req.query.limit;
        const skip = (page - 1) * limit;
        query = query.skip(skip).limit(limit);
        if (req.query.page) {
            const productCount = await Product.countDocuments();
            if (skip >= productCount) throw new Error("This page does not exists.")
        }

        const product = await query;
        res.json(product)
    } catch (error) {
        throw new Error(error);
    }
})

const getaProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const getaProduct = await Product.findById(id);
        res.json({
            getaProduct,
        })
    } catch (error) {
        throw new Error(error);
    }
})

const updateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title);
        }
        console.log(req.body);
        const updateProduct = await Product.findOneAndUpdate({ "_id": id }, { $set: req.body });
        res.json(updateProduct);
    } catch (error) {
        throw new Error(error)
    }
})

const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    console.log(id);
    validateMongoDbId(id);
    try {
        const deleteProduct = await Product.findByIdAndDelete(id);
        res.json(deleteProduct)
    } catch (error) {
        throw new Error(error)
    }
})

module.exports = { 
    createProduct, 
    getaProduct, 
    getAllProducts, 
    updateProduct,
    deleteProduct
}