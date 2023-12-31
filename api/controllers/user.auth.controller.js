import bcryptjs from 'bcryptjs';
import User from '../models/user.models.js';
import { errorHandler } from '../utils/errorHandler.js';
import jwt from 'jsonwebtoken'

// Signup Auth Controllers

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

// Signin Auth Controllers

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

// Google Auth Controllers
export const google = async (req, res, next) => {
    const user = await User.findOne({ email : req.body.email });
    try {
        if(user){
            const token = jwt.sign({id: user.id}, process.env.JWT_SECRET)
            const {password: pass, ...rest} = user._doc;
            res.cookie('access_token', token, {httpOnly : true})
            .status(200)
            .json(rest)
        }else{
            // Generating a password
            const generatedPassword = Math.random().toString(36).slice(-8);
            // hashing the password
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
            // creating new user
            const newUser = new User({
                username : req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-2),
                email : req.body.email,
                password : hashedPassword,
                avatar : req.body.photo
            });
            await newUser.save();
            const webtoken = jwt.sign({id : newUser.id}, process.env.JWT_SECRET);
            const {password: pass, ...rest} = newUser._doc
            res.cookie('access_token', webtoken, {httpOnly : true})
            .status(200)
            .json(rest)
        }
        
    } catch (error) {
        next(error);
    }
}

export const signOut = (req, res, next) => {
    try {
        res.clearCookie('access_token');
        res.status(200).json('User has been logged out!')
    } catch (error) {
        next(error)
    }
}