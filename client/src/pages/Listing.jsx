import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { useSelector } from 'react-redux';
import { Navigation } from 'swiper/modules';
import Contact from '../components/Contact';
import 'swiper/css/bundle';
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkedAlt,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from 'react-icons/fa';

function Listing() {
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false );
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const {currentUser}= useSelector((state)=>state.user);
  SwiperCore.use([Navigation]);
  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `/api/listing/getlisting/${params.listingId}`
        );
        // console.log(response);
        const data = await response.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        console.log("error");
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  return (
    <main>
      {loading && 
        <p className="text-center font-semibold my-8 text-2xl">Loading...</p>
      }
      {error && 
        <p className="text-center font-semibold my-8 text-2xl">
          Something Went Wrong please login again.
        </p>
      }
      {listing && !loading && !error && (
      <div>
        <Swiper navigation>
            {listing.imageURLs.map((url)=>(
              <SwiperSlide key={url}>
              {/* <div 
                className="w-full h-[500px]"
                style={{
                  backgroundImage: `url(${url})`,
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                }}
                ></div> */}
                <img src={url} alt="image" className='w-full h-[300px] sm:h-[600px]'/>
            </SwiperSlide>
            ))}
        </Swiper>
        <div className='fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer'>
            <FaShare
              className='text-slate-500'
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className='fixed top-[23%] right-[3%] z-10 rounded-md bg-slate-100 p-2'>
              Link copied!
            </p>
          )}
          <div className='flex flex-col max-w-4xl mx-auto p-3 my-3 gap-4'>
            <h1 className='text-3xl font-semibold'>
              {listing.name} - ₹
              {listing.askingPrice}
              {listing.type === 'rent' && '/month'} 
            </h1>
            <p className='flex items-center mt-5 gap-2 text-slate-600  text-sm'>
              <FaMapMarkerAlt className='text-red-700' />
              {listing.address}
            </p>
            <div className='flex gap-4'>
              <p className='bg-green-900 w-full max-w-[200px] text-white text-center p-2 rounded-md font-semibold'>
                {listing.type === 'rent' ? 'Available For Rent' : 'Available For Sale'}
              </p>
            </div>
            <p className='text-slate-800'>
              <span className='font-semibold text-black'>Description - </span>
              {listing.description}
            </p>
            <ul className='text-blue-950 font-semibold text-sm flex gap-3 sm:gap-4 items-center flex-wrap'>
              <li className='flex gap-1 items-center whitespace-nowrap'>
                <FaBed className='text-lg'/>
                {listing.bedrooms >1? `${listing.bedrooms} Bedrooms`: `${listing.bedrooms} Bedroom`}
              </li>
              <li className='flex gap-1 items-center whitespace-nowrap'>
                <FaBath className='text-lg'/>
                {listing.bathrooms >1? `${listing.bathrooms} Bathrooms`: `${listing.bathrooms} Bathroom`}
              </li>
              <li className='flex gap-1 items-center whitespace-nowrap'>
                <FaParking className='text-lg'/>
                {listing.parking ? 'Parking space available': 'Parking space not available'}
              </li>
              <li className='flex gap-1 items-center whitespace-nowrap'>
                <FaChair className='text-lg'/>
                {listing.furnished ? 'Furnished': 'Unfurnished'}
              </li>
            </ul>
            {currentUser && listing.userRef !== currentUser._id && !contact &&(
              <button onClick={()=>setContact(true)} className='bg-blue-950 text-white rounded-lg uppercase p-3 hover:opacity-90 active:translate-y-0.5'>Contact landlord</button>
            )}
            {contact && <Contact listing={listing}/>}
          </div>
      </div>)}
    </main>
  );
}

export default Listing;
