import Product from '../models/product.model.js'
import handleError from '../middlewares/errors/handleError.js'
import Category from "../models/category.model.js";

const createProduct = async (req, res) => {
    try {

        if (req.body.price < 0) {
            return handleError(res, null, "Product's price must be positive", 409);
        }

        if (req.body.stock < 0) {
            return handleError(res, null, "Product's stock must be positive", 409);
        }

        const existingCategory = await Category.findById(req.body.category);

        if (!existingCategory) {
            return handleError(res, null, "The specified category does not exist", 400);
        }

        const newProduct = new Product(req.body);
        await newProduct.save();
        return res.status(201).json(newProduct);

    } catch (error) {
        handleError(res, error, "Error in creating product", 500);
    }
};

const getOneProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return handleError(res, null, "No product found", 404); 
        }

        return res.status(200).json( product );
    } catch (error) {
        handleError(res, error, "Error in getting one product", 500); 
    }
};

const getAllProduct = async (req, res) => {
    try {
        const productss = await Product.find().populate('category','name');

        if (productss.length === 0) {
            return res.status(204).send(); 
        }

        return res.status(200).json(productss);
    } catch (error) {
        handleError(res, error, "Error in getting all products", 500);
    }
};

const updateProduct = async (req, res) => {
    try {
        if (req.body.price < 0) {
            return handleError(res, null, "Product's price must be positive", 409);
        }

        if (req.body.stock < 0) {
            return handleError(res, null, "Product's stock must be positive", 409);
        }

        const existingCategory = await Category.findById(req.body.category);

        if (!existingCategory) {
            return handleError(res, null, "The specified category does not exist", 400);
        }

        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!product) {
            return handleError(res, null, "No data found", 404);
        }

        return res.status(200).json( product );
    } catch (error) {
        handleError(res, error, "Error in updating product", 500);
    }
};

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return handleError(res, null, "No product found", 404);
        }

        return res.status(200).json("Product deleted" );
    } catch (error) {
        handleError(res, error, "Error in deleting product", 500);
    }
};

const getProductByCategory = async (req, res) => {
    try {

        const categoryId = req.query.category; 

        const products = await Product.find({ category: categoryId }).populate('category','name');

        //  if (products.length === 0) {
        //     return res.status(204).send(); // No content
        // }

        return res.status(200).json(products);
    } catch (error) {
        handleError(res, error, "Error in getting products by category", 500);
    }
};

const ProductController = {
    createProduct,
    getOneProduct,
    getAllProduct,
    updateProduct,
    deleteProduct,
    getProductByCategory
}

export default ProductController