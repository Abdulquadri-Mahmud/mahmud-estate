import { errorHandler } from '../utils/errorHandler.js';
import User from '../models/user.models.js';
import bcryptjs from 'bcryptjs';
import Listing from '../models/listing.model.js';

export const update = async (req, res, next) => {
    const paramsId = req.params.id
    if (req.user.id !== paramsId) {
        return next(errorHandler(401, 'You can only update your own account!'));
    }
    // get user password

    try {
        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }
        const updatedUser = await User.findByIdAndUpdate(paramsId, {
            $set: {
                username : req.body.username,
                email : req.body.email,
                mobile : req.body.mobile,
                avatar : req.body.avatar,
                password : req.body.password
            }
        }, {new : true});

        const {password, ...rest} = updatedUser._doc;
        res.status(200).json(rest);

    } catch (error) {
        next(error);
    }
}

export const deleteUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
        return next(errorHandler(401, 'You can only delete your own account!'));
        
    }
    try {
        await User.findByIdAndDelete(req.params.id);
        res.clearCookie('access_token');
        res.status(200).json('User has been deleted!');
    } catch (error) {
        next(error);
    }
} 

export const getUserListing = async (req, res, next) => {
    if (req.user.id === req.params.id) {
        try {
            const listing = await Listing.find({userRef : req.params.id});
            res.status(200).json(listing);
        } catch (error) {
            next(error);
        }
    }else{
        return next(errorHandler(401, 'You can only view your own listing!'));
    }
}