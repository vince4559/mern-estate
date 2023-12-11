import React, { useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useUpdateListingMutation } from './listingApiSlice';



const EditListing = () => {
    const location = useLocation();
    const list = location.state;
    const navigate = useNavigate()


    const [updateListing, {isLoading}] = useUpdateListingMutation();
  
    const initials = {
        name: list.name,
        desc: list.desc,
        address:list.address,
        regularPrice: list.regularPrice,
        discountPrice: list.discountPrice,
        bathroom: list.bathroom,
        bedroom: list.bedroom,
        type: list.type,
        parkingLot: list.parkingLot,
        furnished: list.furnished,
        offer: list.offer,
    }

    const [formData, setFormData] = useState(initials);
  


    const handleFormChange = async(e) => {
        const {name, value, checked,type} = e.target;
        setFormData({...formData, [name]: type === 'checkbox' ? checked : value})
    };

    const handleFormSubmit = async(e) => {
        e.preventDefault();
        try {
           await updateListing({id:list._id, ...formData}).unwrap();
           toast.success('updated successfully')
           navigate('/profile')
        } catch (error) {
            console.log(error)
            toast.error("error occurred")
        }
    };


  return (
    <section className='p-5'>
        <h2>Create Listing</h2>
      
        <form onSubmit={handleFormSubmit} >
            <div className='flex flex-wrap items-center justify-center'>

                <label htmlFor='name'>Name: <br/>
                    <input type='text' placeholder='name' name='name' id='name'
                        value={formData.name} onChange={handleFormChange}
                    />
                </label>

                <label htmlFor='desc'>Description: <br/>
                <textarea placeholder='description' name='desc' id='desc'   value={formData.desc} 
                 onChange={handleFormChange} />
                </label>

                <label htmlFor='address'>Address: <br/>
                    <input type='text' placeholder='address' name='address' id='address'
                        value={formData.address} onChange={handleFormChange}
                    />
                </label>

                <div className='flex space-between items-center w-[80%] mx-auto'>
                    <label htmlFor='type'>Type: <br/>
                        <select  onChange={handleFormChange} name='type' value={formData.type} id='type'>
                            <option defaultValue={'rent'} >Rent</option> 
                            <option >Sell</option>
                        </select>
                    </label>
                    <label htmlFor='parkinglot'>parkinglot
                        <input type='checkbox' placeholder='parkinglot' name='parkingLot' className='mx-3'
                            checked={formData.parkingLot} onChange={handleFormChange}  id='parkinglot'
                        />
                    </label>
                    <label htmlFor='furnished'>furnished
                        <input type='checkbox' placeholder='furnished' name='furnished' className='mx-3'
                            checked={formData.furnished} onChange={handleFormChange} id='furnished'
                        />
                    </label>
                    <label htmlFor='offer'>offer
                        <input type='checkbox' placeholder='offer' name='offer' className='mx-3'
                            checked={formData.offer} onChange={handleFormChange}  id='offer' 
                        />
                    </label>
                </div>

                <label htmlFor='regularprice'> 
                {formData.type === 'Rent'? 'regularprice $ per Month' : 'regularprice $'}: <br/>
                    <input type='number' placeholder='regularprice' name='regularPrice' id='regularPrice'
                        value={formData.regularPrice} onChange={handleFormChange} min={50} 
                    />
                </label>

                {formData.offer === true && 
                <label htmlFor='discountprice'>{formData.type === 'Rent'? 'discountedPrice $ per Month' : 'discountedPrice $'} <br/>
                    <input type='number' placeholder='discountprice' name='discountPrice' id='discountedPrice'
                        value={formData.discountPrice} onChange={handleFormChange} min={0} 
                    />
                 </label>
                }
                
                <label htmlFor='bathroom'>bathroom: <br/>
                    <input type='number' placeholder='bathroom' name='bathroom' id='bathroom'
                        value={formData.bathroom} onChange={handleFormChange} min={1} 
                    />
                </label>
                <label htmlFor='bedroom'>bedroom: <br/>
                    <input type='number' placeholder='bedroom' name='bedroom' id='bedroom'
                        value={formData.bedroom} onChange={handleFormChange} min={1}
                    />
                </label>
                
{/* 
                <label htmlFor='Photos'>photos must note be more than 6: <br />
                    <input type='file' accept='image/*' name='photos' id='photos'
                        onChange={handleFileChange}  multiple
                    />
                </label> */}
                
            </div>
            <button className='btn btn-sec w-full' disabled={isLoading} >
                {isLoading? 'Loading' : 'Update Listing'}
            </button>
        </form>
        <ToastContainer 
            autoClose={1000}
            draggable
            theme='dark'
        />
    </section>
  )
}

export default EditListing