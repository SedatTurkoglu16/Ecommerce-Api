const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongoDbId");
const Blog = require("../models/blogModel");
const User = require("../models/userModel");

const createBlog = asyncHandler(async (req, res) => {
    try {
        const newBlog = await Blog.create(req.body);
        res.json(newBlog)
    } catch (error) {
        throw new Error(error)
    }
})

const getAllBlogs = asyncHandler(async (req, res) => {
    try {
        const allBlog = await Blog.find();
        res.json(allBlog)
    } catch (error) {
        throw new Error(error)
    }
})

const getBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const getBlog = await Blog.findById(id).populate("likes").populate("dislikes");
        const updateViews = await Blog.findByIdAndUpdate(
            id,
            {
                $inc: { numViews: 1 },
            },
            { new: true }
        )
        res.json(getBlog);
    } catch (error) {
        throw new Error(error);
    }
})

const updateBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const updated = await Blog.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        res.json(updated);
    } catch (error) {
        throw new Error(error);
    }
})

const deleteBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const deleted = await Blog.findByIdAndDelete(id);
        res.json(deleted);
    } catch (error) {
        throw new Error(error);
    }
})

const likeBlog = asyncHandler(async (req, res) => {
    try {
        const { blogId } = req.body;
        validateMongoDbId(blogId);

        const blog = await Blog.findById(blogId);

        const loginUserId = req?.user?._id
        const isLiked = blog?.isLiked;
        const alreadyDisliked = blog?.dislikes?.find(
            (userId) => userId?.toString() === loginUserId?.toString()
        );

        if (alreadyDisliked) {
            const blog = await Blog.findByIdAndUpdate(
                blogId,
                {
                    $pull: { dislikes: loginUserId },
                    isDisliked: false,
                },
                { new: true }
            );
            res.json(blog)
        }
        if (isLiked) {
            const blog = await Blog.findByIdAndUpdate(
                blogId,
                {
                    $pull: { likes: loginUserId },
                    isLiked: false,
                },
                { new: true }
            );
            res.json(blog)
        } else {
            const blog = await Blog.findByIdAndUpdate(
                blogId,
                {
                    $push: { likes: loginUserId },
                    isLiked: true,
                },
                { new: true }
            );
            res.json(blog)
        }

    } catch (error) {
        throw new Error(error);
    }
})

const dislikeBlog = asyncHandler(async (req, res) => {
    try {
        const { blogId } = req.body;
        console.log(blogId);
        validateMongoDbId(blogId);

        const blog = await Blog.findById(blogId);

        const loginUserId = req?.user?._id
        const isDisliked = blog?.isDisliked;
        const alreadyLiked = blog?.likes?.find(
            (userId) => userId?.toString() === loginUserId?.toString()
        );

        if (alreadyLiked) {
            const blog = await Blog.findByIdAndUpdate(
                blogId,
                {
                    $pull: { likes: loginUserId },
                    isLiked: false,
                },
                { new: true }
            );
            res.json(blog)
        }
        if (isDisliked) {
            const blog = await Blog.findByIdAndUpdate(
                blogId,
                {
                    $pull: { dislikes: loginUserId },
                    isDisliked: false,
                },
                { new: true }
            );
            res.json(blog)
        } else {
            const blog = await Blog.findByIdAndUpdate(
                blogId,
                {
                    $push: { dislikes: loginUserId },
                    isDisliked: true,
                },
                { new: true }
            );
            res.json(blog)
        }

    } catch (error) {
        throw new Error(error);
    }
})

module.exports = { 
    createBlog,
    updateBlog,
    getBlog,
    getAllBlogs,
    deleteBlog,
    likeBlog,
    dislikeBlog
}