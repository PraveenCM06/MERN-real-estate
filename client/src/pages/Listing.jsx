import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { useSelector } from 'react-redux';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';


function Listing() {
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false );
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
      {listing && !loading && !error && <div>
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
      </div>}
    </main>
  );
}

export default Listing;
