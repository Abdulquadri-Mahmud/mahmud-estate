import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/errorHandler.js";

export const createListing = async (req, res, next) => {

    try {
        const listing = await Listing.create(req.body);
        return res.status(201).json(listing);
    } catch (error) {
        next(error)        
    }

}

export const deleteUserListing = async (req,res,next) => {
    const userListings = await Listing.findById(req.params.id);
    if(!userListings){
        return next(errorHandler(404, 'Listing not found!'))
    };
    
    if(req.user.id === req.params.id){
        return next(errorHandler(401, 'You can only delete your own listing!'));
    }
    try {
        await Listing.findByIdAndDelete(req.params.id);
        res.status(200).json('Listing has been deleted');
    } catch (error) {
        next(error)
    }
}

export const updateListings = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id)
    if(!listing){
        next(errorHandler(404, 'Listing not found!'));
    }
    if(req.user.id !== listing.userRef){
        next(errorHandler(401, 'You can only update your own listing!'))
    }
    try {
         const updatesListing = await Listing.findByIdAndDelete(
            req.params.id,
            req.body,
            {new : true}
         );
         res.status(200).json('Updated successfully!')
    } catch (error) {
        next(error)
    }
}