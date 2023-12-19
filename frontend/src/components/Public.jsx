import { Link } from 'react-router-dom';
import ImageCarosel from './ImageCarosel';
import d1 from '/images/d1.webp';
import d2 from '/images/d2.webp';
import d3 from '/images/d3.webp';
import d4 from '/images/d4.webp';
import ListingCard from './ListingCard';
import { 
  useRecentOfferQuery, 
  useRecentRentQuery, 
  useRecentSaleQuery 
} from '../features/Llisting/listingApiSlice';



const Public = () => {
  const photo = [d1, d2, d3, d4];

  const {data, isLoading, isError} = useRecentOfferQuery();
  const rent = useRecentRentQuery();
  const rents = rent?.data;
const sale = useRecentSaleQuery();
const sells = sale?.data;

 
  return (
    <section className='bg-gray-300'>
      <div className='p-10'>
        <h1>
          Find your next perfect place <br/> with ease
        </h1>     
        <p className='text-xl text-gray-800 my-5'>
          With Noble Estates, your search for affordable and luxurios housiing is covered. <br/> Worry no more let us do the perfect search for you.
        </p>
        <Link to={'/search?searchTerm=+'}>
          Let's Start Now...
        </Link>
      </div>     
        <ImageCarosel photo={photo} />

        {/* offer */}
        <div className='my-3'> 
          <h2 className='text-center '>Recent Homes With Offers</h2>
         <div className='flex justify-evenly flex-wrap'>
            {
                isError && [] ? <p>Data not found</p> :
                isLoading? <p>Data is loading</p> : 
                <div className='flex flex-row l flex-wrap gap-4 justify-center '>
                    {
                        data?.slice(0, 4).
                        map(listing => (
                            <ListingCard key={listing._id} listing={listing} />
                        ))
                    }
                </div>
            }
         </div>
        </div>

             {/* rent */}
        <div className='my-5'> 
          <h2 className='text-center'>Recent Homes for Rents</h2>
         <div className='flex justify-evenly flex-wrap'>
                 {
                    rents?.slice(0, 4).
                    map(listing => (
                        <ListingCard key={listing._id} listing={listing} />
                    ))
                }
         </div>
        </div>

             {/* sell */}
        <div className='my-5'> 
          <h2 className='text-center'>Recent Homes for Sell</h2>
         <div className='flex justify-evenly flex-wrap'>
                 {
                    sells?.slice(0, 4).
                    map(listing => (
                        <ListingCard key={listing._id} listing={listing} />
                    ))
                }
         </div>
        </div>
    </section>
  )
}

export default Public
