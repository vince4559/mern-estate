import { FaBed, FaBath} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ListingCard = ({listing}) => {
    const navigate = useNavigate();

    const handleNav = () => {
        navigate(`/listing/${listing._id}`, {state:listing})
    }


  return (
    <section>
         <div  onClick={handleNav}
         className='flex flex-col gap-2 p-2 bg-slate-200 w-64 rounded-lg cursor-pointer hover:scale-105'>
            <img src={listing.photos[0]} alt={listing.name} 
                width={350} 
            />
            <h3 className='uppercase truncate'>{listing.name}</h3>
            <div className='flex gap-2'>
                <p>{location.address}</p>
            </div>

            <p className="truncate">{listing.desc}</p>

            <h3 className='bold'>
            {listing.type === 'Rent'? `$${listing.regularPrice.toLocaleString('en-US')} / Month` 
            : `$${listing.regularPrice.toLocaleString('en-US')}`}
            </h3>

            <div>
            <p className='flex gap-1 items-center'>
                <FaBed size={18} color='green' />
                {listing.bedroom} {listing.bedroom > 1 ? 'Beds' : 'Bed'}
            </p>

                <p className='flex gap-1 items-center'>
                <FaBath size={18} color='green' />
                {listing.bathroom} {listing.bathroom > 1 ? 'Baths' : 'Bath'}
                </p> 
            </div>
        </div>
    </section>
  )
}

export default ListingCard