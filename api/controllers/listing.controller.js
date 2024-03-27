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
};

export const getListings = async (request, response, next)=>{
        try {
            const limit= parseInt(request.query.limit) || 9;
            const startIndex = parseInt(request.query.startIndex) || 0;
            let furnished =request.query.furnished;
            if(furnished === undefined || furnished === 'false'){
                furnished = {$in:[false, true]};
            }

            let parking =request.query.parking;
            if(parking === undefined || parking === 'false'){
                parking = {$in:[false, true]};
            }

            let type = request.query.type;
            if(type === undefined || type === 'all'){
                type = {$in:['sell', 'rent']};
            }

            const searchTerm = request.query.searchTerm || '';
            const sort = request.query.sort || 'createdAt';
            const order = request.query.order || 'desc';

            const listings = await Listing.find({
                $or: [
                    { name: { $regex: searchTerm, $options: 'i' } },
                    { city: { $regex: searchTerm, $options: 'i' } }
                ],
                furnished,
                parking,
                type,
            }).sort(
                {[sort]:order}
                ).limit(limit).skip(startIndex);

                return response.status(200).json(listings);
        } catch (error) {
            next(error);
        }
};