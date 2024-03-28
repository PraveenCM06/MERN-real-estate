import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
function ListingCard({ listing }) {
  return (
    <div className="bg-white shadow-md hover:shadow-xl transition-shadow overflow-hidden rounded-lg w-full sm:w-[300px]">
      <Link to={`/listing/${listing._id}`}>
        <img
          src={listing.imageURLs[0]}
          alt="listing-image"
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
        />
        <div className="p-3 flex flex-col gap-2">
          <p className="text-lg font-bold text-slate-700 truncate ">
            {listing.name}
          </p>
          <div className="flex items-center">
            <MdLocationOn className="text-red-700 h-4 w-4" />
            <p className="text-md text-gray-500 truncate">{listing.address}</p>
          </div>
          <p className="line-clamp-2 text-sm text-gray-500">
            {listing.description}
          </p>
          <p className="font-bold text-slate-600 mt-3">
            ₹ {listing.askingPrice.toLocaleString("en-IN")}
            {listing.type === 'rent' && ' / month'}
          </p>
          <div className="flex gap-4 text-xs font-semibold text-slate-600">
            <div className="">
                {listing.bedrooms>1 ? `${listing.bedrooms} bedrooms` : `${listing.bedrooms} bedroom`}
            </div>
            <div className="">
                {listing.bathrooms>1 ? `${listing.bathrooms} bathrooms` : `${listing.bathrooms} bathroom`}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ListingCard;
