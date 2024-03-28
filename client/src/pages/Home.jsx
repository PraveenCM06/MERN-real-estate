import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css/bundle';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import ListingCard from '../components/ListingCard';
function Home() {
  const [allListings, setAlllistings]=useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use(Navigation);
  useEffect(()=>{
    const fetchallListings = async ()=>{
      try {
        const response = await fetch(`/api/listing/get?type=all&limit=6`);
        const data = await response.json();
        setAlllistings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    }
    const fetchRentListings = async()=>{
      try {
        const response = await fetch(`/api/listing/get?type=rent&limit=6`);
        const data = await response.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    }
    const fetchSaleListings = async()=>{
      try {
        const response = await fetch(`/api/listing/get?type=sell&limit=6`);
        const data = await response.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchallListings();
  },[]);
  return (
    <div>
      {/* section 1 */}
      <div className="flex flex-col gap-4 sm:gap-6 py-28 px-5 max-w-6xl mx-auto">
        <h1 className='text-slate-600 text-3xl sm:text-4xl lg:text-6xl font-bold'>Find your next <span className='text-slate-800'>perfect home</span> <br /> with ease </h1>
        <div className="text-gray-500 text-xs sm:text-sm">
            we will help your home finding journey a lot more easier, faster and comfortable <br /> with our wide range of properties to choose from.
        </div>
        <Link to='/search' className='text-xs sm:text-sm text-blue-700 font-bold hover:underline'>Start your search here..</Link>
      </div>
      {/* section 2 swiper */}
      <Swiper navigation>
      {
        allListings && allListings.length>1 && allListings.map((listing)=>(
            <SwiperSlide>
              <div key={listing._id}>
                <img className='w-full h-[500px] object-cover rounded-lg sm:rounded-3xl' src={listing.imageURLs[0]} alt="" />
              </div>
            </SwiperSlide>
        ))
      }
      </Swiper>
      {/* section 3 */}
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-7 my-10">
        {allListings && allListings.length>0 && (
          <div className="">
              <div className="">
                <h2 className='text-xl font-semibold text-slate-700'>All Listings</h2>
                <Link to={'/search'} className='text-xs text-blue-600'>show all listings</Link>
              </div>
              <div className="flex flex-wrap gap-4">
                {allListings.map((listing)=>(
                  <ListingCard listing={listing} key={listing._id}/>
                ))}
              </div>
          </div>
        )}
      </div>
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-7 my-10">
        {rentListings && rentListings.length>0 && (
          <div className="">
              <div className="">
                <h2 className='text-xl font-semibold text-slate-700'>Rental properties</h2>
                <Link to={'/search?type=rent'} className='text-xs text-blue-600'>show rental properties</Link>
              </div>
              <div className="flex flex-wrap gap-4">
                {rentListings.map((listing)=>(
                  <ListingCard listing={listing} key={listing._id}/>
                ))}
              </div>
          </div>
        )}
      </div>
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-7 my-10">
        {saleListings && saleListings.length>0 && (
          <div className="">
              <div className="">
                <h2 className='text-xl font-semibold text-slate-700'>Properties for Sale</h2>
                <Link to={'/search?type=sell'} className='text-xs text-blue-600'>show properties for sale</Link>
              </div>
              <div className="flex flex-wrap gap-4">
                {saleListings.map((listing)=>(
                  <ListingCard listing={listing} key={listing._id}/>
                ))}
              </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home