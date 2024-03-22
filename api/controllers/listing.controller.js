import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async (request, response, next)=>{
try {
    const listing = await Listing.create(request.body);
    return response.status(201).json(listing);
} catch (error) {
    next(error);
}
};


export const deleteListing = async (request, response, next)=>{
    const listing = await Listing.findById(request.params.id);
    if(!listing){
        return next(errorHandler(404, "listing not found"));
    }

    if(request.user.id !== listing.userRef){
        return next(errorHandler(401, 'You can only delete your own listings!'));
    }

    try {
        await Listing.findByIdAndDelete(request.params.id);
        response.status(200).json('Listing has been deleted');
    } catch (error) {
        next(error);
    }
};

export const editListing = async (request, response, next)=>{
    const listing = await Listing.findById(request.params.id);
    if(!listing){
        return next(errorHandler(404, "listing not found"));
    }

    if(request.user.id !== listing.userRef){
        return next(errorHandler(401, 'You can only delete your own listings!'));
    }
    try {
        const editedListing = await Listing.findByIdAndUpdate(
            request.params.id,
            request.body,
            {new: true}
        );
        response.status(200).json(editedListing);
    } catch (error) {
        next(error);
    }
};

export const getListing = async (req, res, next)=>{
    try {
        const listing = await Listing.findById(req.params.id);
        if(!listing){
            return next(errorHandler(404, 'Listing not found!'));
        }
        res.status(200).json(listing);
    } catch (error) {
        next(error)
    }
}