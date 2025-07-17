import User from '../models/user.model.js'
import handleError from '../middlewares/errors/handleError.js'
import Order from '../models/order.model.js';

const createUser = async (req, res) => {
    try {
        const existingUser = await User.findOne({ name: req.body.name });
        const existingEmail = await User.findOne({ email: req.body.email });

        if (existingUser || existingEmail) {
            return handleError(res, null, "User with this name/email already exists", 409);
        }

        const newUser = new User(req.body);
        await newUser.save();
        return res.status(201).json( newUser);
    } catch (error) {
        handleError(res, error, "Error in creating User", 500);
    }
};

const getAllUser = async (req, res) => {
    try {
        const users = await User.find();

        if (users.length === 0) {
            return res.status(204).send();
        }

        return res.status(200).json(users);
    } catch (error) {
        handleError(res, error, "Error in getting all user", 500);
    }
};

const getOneUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return handleError(res, null, "No user found", 404); // 404 Not Found
        }

        return res.status(200).json( user);
    } catch (error) {
        handleError(res, error, "Error in getting one user", 500); // 500 server error
    }
};

const updateUser = async (req, res) => {
    try {
        const existingUser = await User.findOne({
            name: req.body.name,
            _id: { $ne: req.params.id } 
        });

        const existingEmail = await User.findOne({
            email: req.body.email,
            _id: { $ne: req.params.id }
        });

        if (existingUser || existingEmail) {
            return handleError(res, null, "User with this name/email already exists", 409);
        }

        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!user) {
            return handleError(res, null, "No data found", 404);
        }

        return res.status(200).json(user);
    } catch (error) {
        handleError(res, error, "Error in updating user", 500);
    }
};
 
const deleteUser = async (req, res) => {
    try {
        const order = await Order.findOne ({ user: req.params.id });
        if (order){
            if(order.status==="shipped"){
                return handleError(res, null, "This user has already a shipped order, you cannot delete user before delivery", 400);
            }else {
                await Order.findByIdAndDelete(order._id);
            }
        }
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return handleError(res, null, "No user found", 404);
        }

        return res.status(200).json("user deleted" );
    } catch (error) {
        handleError(res, error, "Error in deleting user", 500);
    }
};

const UserController = {
    createUser,
    getOneUser,
    getAllUser,
    updateUser,
    deleteUser
}

export default UserController