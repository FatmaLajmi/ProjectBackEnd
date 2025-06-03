import Category from '../models/category.model.js'
import handleError from '../middlewares/errors/handleError.js'
import Product from '../models/product.model.js'

// Category to create a new category
const createCategory = async (req, res) => {
    try {
        // Check if an Category with the same name already exists
        const existingCategory = await Category.findOne({ name: req.body.name });

        if (existingCategory) {
            return handleError(res, null, "Category with this name already exists", 409); 
        }

        const newCategory = new Category(req.body);
        await newCategory.save();
        return res.status(201).json(newCategory);
    } catch (error) {
        handleError(res, error, "Error in creating Category", 500);
    }
};

const getOneCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        if (!category) {
            return handleError(res, null, "No category found", 404); // 404 Not Found
        }

        return res.status(200).json( category );
    } catch (error) {
        handleError(res, error, "Error in getting one category", 500); // 500 server error
    }
};

const getAllCategory = async (req, res) => {
    try {
        const categories = await Category.find();

        if (categories.length === 0) {
            return res.status(204).send(); // No content
        }

        return res.status(200).json(categories);
    } catch (error) {
        handleError(res, error, "Error in getting all categoriess", 500);
    }
};

const updateCategory = async (req, res) => {
    try {
        // Check if another category already has the same name
        const existingCategory = await Category.findOne({
            name: req.body.name,
            _id: { $ne: req.params.id } // Exclude the current category
        });

        if (existingCategory) {
            return handleError(res, null, "Category with this name already exists", 409);
        }

        const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!category) {
            return handleError(res, null, "No data found", 404);
        }

        return res.status(200).json(category);
    } catch (error) {
        handleError(res, error, "Error in updating category", 500);
    }
};

const deleteCategory = async (req, res) => {
    try {
        //check if category is used in any product before deleting
        const products = await Product.find({ category: req.params.id });

        if (products.length > 0){
            return handleError(res, null, "Must delete product before category", 400);
        }

        const category = await Category.findByIdAndDelete(req.params.id);

        if (!category) {
            return handleError(res, null, "No category found", 404);
        }

        

        return res.status(200).json("Category deleted" );
    } catch (error) {
        handleError(res, error, "Error in deleting category", 500);
    }
};

const CategoryController = {
    createCategory,
    getOneCategory,
    getAllCategory,
    updateCategory,
    deleteCategory
}

export default CategoryController