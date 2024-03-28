import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListingCard from "../components/ListingCard";
function Search() {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    sort: "created_at",
    order: "desc",
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermfromUrl = urlParams.get("searchTerm");
    const typefromUrl = urlParams.get("type");
    const parkingfromUrl = urlParams.get("parking");
    const furnishedfromUrl = urlParams.get("furnished");
    const sortfromUrl = urlParams.get("sort");
    const orderfromUrl = urlParams.get("order");

    if (
      searchTermfromUrl ||
      typefromUrl ||
      parkingfromUrl ||
      furnishedfromUrl ||
      sortfromUrl ||
      orderfromUrl
    ) {
      setSidebarData({
        searchTerm: searchTermfromUrl || "",
        type: typefromUrl || "all",
        parking: parkingfromUrl === "true" ? true : false,
        furnished: furnishedfromUrl === "true" ? true : false,
        sort: sortfromUrl || "created_at",
        order: orderfromUrl || "desc",
      });
    }

    const fetchListings = async()=>{
        setLoading(true);
        const searchQuery = urlParams.toString();
        const response = await fetch(`/api/listing/get?${searchQuery}`);
        const data = await response.json();
        setListings(data);
        setLoading(false);
    }
    fetchListings();

  }, [location.search]);

  const handleChange = (e) => {
    if (
      e.target.id === "all" ||
      e.target.id === "rent" ||
      e.target.id === "sale"
    ) {
      setSidebarData({ ...sidebarData, type: e.target.id });
    }
    if (e.target.id === "searchTerm") {
      setSidebarData({ ...sidebarData, searchTerm: e.target.value });
    }
    if (e.target.id === "parking" || e.target.id === "furnished") {
      setSidebarData({
        ...sidebarData,
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? true : false,
      });
    }

    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "created_at";
      const order = e.target.value.split("_")[1] || "desc";
      setSidebarData({ ...sidebarData, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebarData.searchTerm);
    urlParams.set("type", sidebarData.type);
    urlParams.set("parking", sidebarData.parking);
    urlParams.set("furnished", sidebarData.furnished);
    urlParams.set("sort", sidebarData.sort);
    urlParams.set("order", sidebarData.order);
    const searchQuery = urlParams.toString();

    navigate(`/search?${searchQuery}`);
  };


  return (
    <div className="flex flex-col md:flex-row p-2 gap-4 ">
      <div className="p-7 border-2 border-b-slate-300 md:border-2 md:border-r-slate-300 md:border-b-0">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-bold text-blue-950">
              Search Term:{" "}
            </label>
            <input
              className="rounded-lg p-3 w-full border-2 border-slate-100"
              type="text"
              id="searchTerm"
              placeholder="Search.."
              value={sidebarData.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-bold text-blue-950">Type: </label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="all"
                className="w-5"
                onChange={handleChange}
                checked={sidebarData.type === "all"}
              />
              <label htmlFor="all">Rent & Sale</label>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="rent"
                className="w-5"
                onChange={handleChange}
                checked={sidebarData.type === "rent"}
              />
              <label htmlFor="rent">Rent</label>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="sale"
                className="w-5"
                onChange={handleChange}
                checked={sidebarData.type === "sale"}
              />
              <label htmlFor="sale">Sale</label>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-bold text-blue-950">Amenities: </label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                className="w-5"
                onChange={handleChange}
                checked={sidebarData.parking}
              />
              <label htmlFor="parking">Parking</label>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="w-5"
                onChange={handleChange}
                checked={sidebarData.furnished}
              />
              <label htmlFor="furnished">Furnished</label>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label className="font-bold text-blue-950" htmlFor="sort_order">
              Sort:
            </label>
            <select
              onChange={handleChange}
              defaultValue={"created_at_desc"}
              className="boder-2 rounded-lg p-2"
              id="sort_order"
            >
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
              <option value="askingPrice_desc">Price High to Low</option>
              <option value="askingPrice_asc">Price Low to High</option>
            </select>
          </div>
          <button className="bg-blue-950 text-white p-3 rounded-lg uppercase hover:opacity-95 active:translate-y-0.5">
            Search
          </button>
        </form>
      </div>
      <div className="flex-1">
        <h1 className="text-3xl font-semibold p-3 text-slate-700 mt-0 md:mt-5">
          Listing results:
        </h1>
        <div className="p-7 flex flex-wrap gap-4 justify-center">
            {!loading && listings.length === 0 &&(
                <p className="text-xl text-red-700 font-semibold">No Listing Found!</p>
            )}
            {loading && (
                <p className="text-xl text-slate-700 font-semibold text-center w-full">Loading...</p>
            )}

            {!loading && listings && listings.map((listing)=>(
                <ListingCard key={listing._id} listing={listing}/>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Search;
