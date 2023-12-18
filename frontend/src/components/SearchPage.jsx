import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetAllListingsQuery } from '../features/Llisting/listingApiSlice';
import ListingCard from './ListingCard';
import lottie from '/images/lotie.webm'
import ReactPaginate from 'react-paginate';
import '../App.css'


const initials = {
    searchTerm: '',
    type: 'all',
    parkingLot: false,
    furnished: false,
    offer: false,
    sort: 'createdAt',
    order: 'desc',
}

const SearchPage = () => {
    const [sideSearchData, setSideSearchData] = useState(initials);
    const  [pageNumber, setPageNumber] = useState(0);

    const urlparams = new URLSearchParams(location.search);
    const searchQuery = urlparams.toString();
    const {data, isLoading , isError} = useGetAllListingsQuery(searchQuery);
    
    const userPerPage= 2;
    const pageVisied = pageNumber * userPerPage;

    // displayUsers =data.map()

    const navigate = useNavigate();



    
    // console.log(data)
       


    const handleOnchange = (e) => {
        // type category
       if(e.target.id === 'all' || e.target.id === 'rent' || e.target.id === 'sell'){
            setSideSearchData({...sideSearchData, type: e.target.id})
       };
       
        // search category
       if(e.target.id === 'searchTerm'){
        setSideSearchData({...sideSearchData, searchTerm: e.target.value})
       };

        // boolean|checked category
       if(e.target.id === 'parkingLot' || e.target.id === 'furnished' || e.target.id === 'offer'){
            setSideSearchData({
                ...sideSearchData, 
                [e.target.id]: 
                e.target.checked || e.target.checked === 'true'? true : false
            })
       };

        // sort|order category
        if(e.target.id === 'sort_order'){
            const sort = e.target.value.split('_')[0] || 'createdAt';
            const order = e.target.value.split('_')[1] || 'desc';
            setSideSearchData({...sideSearchData, sort, order})
        };

    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const urlparams = new URLSearchParams();
        urlparams.set('searchTerm', sideSearchData.searchTerm);
        urlparams.set('type', sideSearchData.type);
        urlparams.set('parkingLot', sideSearchData.parkingLot);
        urlparams.set('furnished', sideSearchData.furnished);
        urlparams.set('offer', sideSearchData.offer);
        urlparams.set('sort', sideSearchData.sort);
        urlparams.set('order', sideSearchData.order);
        const searchQuerry = urlparams.toString();
        navigate(`/search?${searchQuerry}`)
    };

    useEffect(() => {
        const urlparams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlparams.get('searchTerm');
        const typeFromUrl = urlparams.get('type');
        const parkinglotFromUrl = urlparams.get('parkingLot');
        const furnishedFromUrl = urlparams.get('furnished');
        const offerFromUrl = urlparams.get('offer');
        const sortFromUrl = urlparams.get('sort');
        const orderFromUrl = urlparams.get('order');

        if(searchTermFromUrl ||
             typeFromUrl || 
             parkinglotFromUrl ||
             furnishedFromUrl ||
             offerFromUrl || 
             sortFromUrl || 
             orderFromUrl
        ){
            setSideSearchData({
                searchTerm: searchTermFromUrl || ' ',
                type: typeFromUrl || 'all',
                parkingLot: parkinglotFromUrl === 'true' ? true : false,
                furnished: furnishedFromUrl === 'true' ? true : false,
                offer : offerFromUrl === 'true' ? true : false,
                sort : sortFromUrl || 'created_at',
                order: orderFromUrl || 'desc',
            })
        }

    },[location.search]);

    const pageCount = Math.ceil(data?.length / userPerPage);

    const pageChange = ({selected}) => {
        setPageNumber(selected)
        window.scroll(0, 450)
    }

  return (
   <section className='p-4 flex flex-col gap-8'>
        <div className='w-full flex justify-around border-b'>
            <form className='' onSubmit={handleSubmit}>
                {/* search */}
               <div className='flex gap-2 items-center '>
                    <label className='whitespace-nowrap'>Search Term:</label>
                    <input type='search' id='searchTerm' placeholder='Search...'
                        value={sideSearchData.searchTerm}
                        onChange={handleOnchange}
                        className='w-full h-10 p-1'
                    />
               </div>
               
               {/* Type */}
               <div className='flex  items-center flex-wrap justify-around border p-1 rounded-lg'>
                    <label className='whitespace-nowrap'>Type:</label>
                        {/* rent & sell */}
                    <div className='flex gap-1 items-center'>
                        <input type='checkbox' id='all' checked={sideSearchData.type === 'all'} 
                            onChange={handleOnchange}
                        />
                        <span className='whitespace-nowrap'>Rent & Sell</span>
                    </div>
                        {/* rent */}
                    <div className='flex gap-1 items-center'>
                        <input type='checkbox' id='rent' checked={sideSearchData.type === 'rent'} 
                            onChange={handleOnchange}
                        />
                        <span>Rent</span>
                    </div>
                        {/* sell */}
                    <div className='flex gap-1 items-center'>
                        <input type='checkbox' id='sell' checked={sideSearchData.type === 'sell'} 
                            onChange={handleOnchange}
                        />
                        <span>Sell</span>
                    </div>

                        {/* offer */}
                    <div className='flex gap-1 items-center'>
                        <input type='checkbox' id='offer' checked={sideSearchData.offer} 
                            onChange={handleOnchange}
                        />
                        <span>Offer</span>
                    </div>
               </div>

               {/* amenities */}
               <div className='flex justify-around items-center'>
                    <label className='whitespace-nowrap'>Amenities:</label>
                    
                    {/* parking */}
                    <div className='flex gap-1 items-center'>
                        <input type='checkbox' id='parkingLot' checked={sideSearchData.parkingLot} 
                            onChange={handleOnchange}
                        />
                        <span>Parking</span>
                    </div>

                    {/* furnished */}
                    <div className='flex gap-1 items-center'>
                        <input type='checkbox' id='furnished' checked={sideSearchData.furnished} 
                            onChange={handleOnchange}
                        />
                        <span>Furnished</span>
                    </div>
               </div>

                {/* sort & order */}
               <div className='flex gap-3 items-center'>
                    <label className='whitespace-nowrap'>Sort:</label>
                    <select id='sort_order' 
                        defaultValue={'created_at_desc'}
                        onChange={handleOnchange}
                    >
                        <option value={'regularPrice_desc'}>Price high to low</option>
                        <option value={'regularPrice_asc'}>Price low to high</option>
                        <option value={'createdAt_desc'}>Latest</option>
                        <option value={'createdAt_asc'}>Oldest</option>
                    </select>
               </div>
               <button type='submit' className='btn btn-prim w-full'>Search</button>
            </form>

            <div className='hidden md:block'>
                <video src={lottie} width={400} autoPlay loop controls />
            </div>
        </div>

        {/* fetch data here */}
        <div className='mb-4'>
            <h2 className='text-center my-4'>Listings...</h2>
                {
                    isError && [] ? <p>Data not found</p> :
                    isLoading? <p>Data is loading</p> : 
                    <div className='flex flex-row l flex-wrap gap-4 justify-center '>
                        {
                            data.slice(pageVisied, pageVisied + userPerPage).
                            map(listing => (
                                <ListingCard key={listing._id} listing={listing} />
                            ))
                        }
                    </div>
                }
            </div>

           <div >
                <ReactPaginate 
                pageCount={pageCount}
                onPageChange={pageChange}
                renderOnZeroPageCount={null}
                previousLabel={'Prev'}
                nextLabel={'Next'}
                containerClassName='paginationBtn'
                activeClassName='paginationActive'
                
            />
           </div>
   </section>
  )
}

export default SearchPage

