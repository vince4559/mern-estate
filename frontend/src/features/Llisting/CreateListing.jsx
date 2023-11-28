import React, { useState } from 'react'

const initials = {
    name:'',
    desc: '',
    address:'',
    regularPrice:0,
    discountPrice: 0,
    bathroom: 0,
    bedroom: 0,
    type:'',
    parkingLot: false,
    furnished: false,
    offer: false,
    imageUrl:[],
    userRef:''
}

const CreateListing = () => {
const [formData, setFormData] = useState(initials);


const handleFormChange = async(e) => {
const {name, value, checked,type} = e.target;
setFormData({...formData, [name]: type === 'checkbox' ? checked : value})
};

const handleImageChange = (e, i) => {
    const {files, filename} = e.target;
    setFormData({...formData, [filename]:files[i]})
};

console.log(formData)
  return (
    <section>
        <h2>Create Listing...</h2>
      
        <form className='flex flex-wrap items-center justify-center'>
            <label htmlFor='name'>Name: <br/>
                <input type='text' placeholder='name' name='name' id='name'
                    value={formData.name} onChange={handleFormChange} required
                />
            </label>
            <label htmlFor='desc'>Description: <br/>
                <input type='text' placeholder='description' name='desc' id='desc'
                    value={formData.desc} onChange={handleFormChange} required
                />
            </label>
            <label htmlFor='address'>Address: <br/>
                <input type='text' placeholder='address' name='address' id='address'
                    value={formData.address} onChange={handleFormChange} required
                />
            </label>
            <label htmlFor='regularprice'>regularprice: <br/>
                <input type='number' placeholder='regularprice' name='regularPrice' id='regularPrice'
                    value={formData.regularPrice} onChange={handleFormChange} required
                />
            </label>
            <label htmlFor='discountprice'>discountprice: <br/>
                <input type='number' placeholder='discountprice' name='discountPrice' id='discountedPrice'
                    value={formData.discountPrice} onChange={handleFormChange} required
                />
            </label>
            <label htmlFor='bathroom'>bathroom: <br/>
                <input type='number' placeholder='bathroom' name='bathroom' id='bathroom'
                    value={formData.bathroom} onChange={handleFormChange} required
                />
            </label>
            <label htmlFor='bedroom'>bedroom: <br/>
                <input type='number' placeholder='bedroom' name='bedroom' id='bedroom'
                    value={formData.bedroom} onChange={handleFormChange} required
                />
            </label>
            <label htmlFor='type'>Type: <br/>
                <select required  onChange={handleFormChange} name='type' value={formData.type} id='type'>
                    <option >Rent</option> 
                    <option >Sell</option>
                </select>
            </label>
            <label htmlFor='parkinglot'>parkinglot
                <input type='checkbox' placeholder='parkinglot' name='parkingLot' className='mx-3'
                    value={formData.parkingLot} onChange={handleFormChange} required id='parkinglot'
                />
            </label>
            <label htmlFor='furnished'>furnished
                <input type='checkbox' placeholder='furnished' name='furnished' className='mx-3'
                    value={formData.furnished} onChange={handleFormChange} required id='furnished'
                />
            </label>
            <label htmlFor='offer'>offer
                <input type='checkbox' placeholder='offer' name='offer' className='mx-3'
                    value={formData.offer} onChange={handleFormChange} required id='offer' 
                />
            </label>
            <label htmlFor='imageurl'>imageurl <br />
                <input type='file' name='imageUrl' accept='image/*' multiple id='imageurl'
                    value={formData.imageUrl} onChange={(e) =>handleImageChange(e,0)} required
                />
            </label>
            <label htmlFor='userRef'>userRef <br />
                <input type='text' placeholder='userRef' name='userRef' id='userRef'
                    value={formData.userRef} onChange={handleFormChange} required
                />
            </label>
        </form>
    
    </section>
  )
}

export default CreateListing