import bcryptjs from 'bcryptjs';
import User from '../models/user.models.js';
import { errorHandler } from '../utils/errorHandler.js';
import jwt from 'jsonwebtoken'

export const signup = async (req, res, next) => {
    const {username, email, mobile, password} = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({username, email, mobile, password: hashedPassword});

    try {
        await newUser.save();
        res.status(201).json('User created successfully!');
    } catch (error) {
        next(error)
    }
};

export const signin = async(req, res, next) => {
    const {email, password} = req.body;
    try {
        const validUser = await User.findOne({email});
        if (!validUser) {
            return next(errorHandler(404, 'User not found!'));
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) {
            return next(errorHandler(401, 'Wrong credential!'))           
        }
        const webtoken = jwt.sign({id: validUser._id}, process.env.JWT_SECRET);
        const {password: pass, ...rest} = validUser._doc;
        res
        .cookie('access_token', webtoken, {httpOnly: true})
        .status(200)
        .json(rest);
    } catch (error) {
        next(error);
    }
}
