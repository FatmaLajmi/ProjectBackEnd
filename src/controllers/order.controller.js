import Order from '../models/order.model.js'
import User from '../models/user.model.js';
import Product from '../models/product.model.js';
import handleError from '../middlewares/errors/handleError.js'
import {validStatuses} from '../types/status.types.js'

const createOrder = async (req, res) => {
    try {

        const existingUser = await User.findById(req.body.user);

        if (!existingUser) {
            return handleError(res, null, "The specified user does not exist", 400);
        }
        

        if (req.body.status && !validStatuses.includes(req.body.status)) {
            return handleError(res, null, "Status must be one of ['pending', 'shipped', 'delivered', 'canceled']", 400);
        }
        
        const results = await Promise.all(
            req.body.products.map(async (item) => {
                const product = await Product.findById(item.product);
                if (!product) {
                    throw new Error("The specified product does not exist");
                }

                if (item.quantity < 1) {
                    throw new Error("The order must have at least one product");
                }

                return product.price * item.quantity; 
            }
            )
        );

        const totalPrice = results.reduce((sum, price) => sum + price, 0);
        req.body.totalPrice = totalPrice;

        const newOrder = new Order(req.body);
        await newOrder.save();
        return res.status(201).json(newOrder);

    } catch (error) {
        handleError(res, error, error.message || "Error in creating Order", 500);
    }
};

const getAllOrder = async (req, res) => {
    try {
        const orders = await Order.find().populate('user','name').populate('products.product', 'name'); 
        if (orders.length === 0) {
            return res.status(204).send(); 
        }

        return res.status(200).json(orders);
    } catch (error) {
        handleError(res, error, "Error in getting all orders", 500);
    }
};

const getOneOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return handleError(res, null, "No order found", 404); 
        }

        return res.status(200).json( order );
    } catch (error) {
        handleError(res, error, "Error in getting one order", 500); 
    }
};

const updateOrder = async (req, res) => {
    try {
        const existingUser = await User.findById(req.body.user);

        if (!existingUser) {
            return handleError(res, null, "The specified user does not exist", 400);
        }
        
        if (req.body.status && !validStatuses.includes(req.body.status)) {
            return handleError(res, null, "Status must be one of ['pending', 'shipped', 'delivered', 'canceled']", 400);
        }
        
        const results = await Promise.all(
            req.body.products.map(async (item) => {
                const product = await Product.findById(item.product);
                if (!product) {
                    throw new Error("The specified product does not exist");
                }

                if (item.quantity < 1) {
                    throw new Error("The order must have at least one product");
                }

                return product.price * item.quantity; 
            }
            )
        );

        const totalPrice = results.reduce((sum, price) => sum + price, 0);
        req.body.totalPrice = totalPrice;

        const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!order) {
            return handleError(res, null, "No data found", 404);
        }

        return res.status(200).json( order );
    } catch (error) {
        handleError(res, error, error.message || "Error in updating order", 500);
    }
};

const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return handleError(res, null, "No order found", 404);
        }

        if (order.status !== "canceled") {
            return handleError(res, null, "Cannot delete this order, status must be 'canceled'", 400);
        }

        await Order.findByIdAndDelete(req.params.id);

        return res.status(200).json("Order deleted");
    } catch (error) {
        handleError(res, error, "Error in deleting order", 500);
    }
}

const getOrderByStatus = async (req, res) => {
  try {
    const stat = req.query.status;

    if (!validStatuses.includes(stat)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const orders = await Order.find({ status: stat });

    if (orders.length === 0) {
      return res.status(200).json({ message: `No orders ${stat}` });
    }

    return res.status(200).json(orders);

  } catch (error) {
    handleError(res, error, "Error in getting orders by status", 500);
  }
}

const getOrderByUser = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized: No user found' });
    }

    const userId = req.user.id;
    const orders = await Order.find({ user: userId }).populate('user', 'name');

    return res.status(200).json(orders);

  } catch (error) {
    handleError(res, error, "Error in getting orders by user", 500);
  }
};

const orderController = {
    createOrder,
    getOneOrder,
    getAllOrder,
    updateOrder,
    deleteOrder,
    getOrderByUser,
    getOrderByStatus
}

export default orderController