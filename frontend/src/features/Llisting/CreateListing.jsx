import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';


const initials = {
    name:'',
    desc: '',
    address:'',
    regularPrice:0,
    discountPrice: 0,
    bathroom: 1,
    bedroom: 1,
    type:'',
    parkingLot: false,
    furnished: false,
    offer: false,
    userRef:''
}

const CreateListing = () => {
const [formData, setFormData] = useState(initials);
const [files, setFiles] = useState(null);
const navigate = useNavigate();

const userRef = useSelector(current_id);


const handleFormChange = async(e) => {
const {name, value, checked,type} = e.target;
setFormData({...formData, [name]: type === 'checkbox' ? checked : value})
};

const handleFileChange = (e) => {
    if(e.target.files){
        setFiles(e.target.files)
    }
};

const handleFormSubmit = async(e) => {
    e.preventDefault();

  if(files){
        const formDatas = new FormData();
        formDatas.append('name', formData.name);
        formDatas.append('desc', formData.desc);
        formDatas.append('address', formData.address);
        formDatas.append('regularPrice', formData.regularPrice);
        formDatas.append('discountPrice', formData.discountPrice);
        formDatas.append('bathroom', formData.bathroom);
        formDatas.append('bedroom', formData.bedroom);
        formDatas.append('type', formData.type);
        formDatas.append('parkingLot', formData.parkingLot);
        formDatas.append('furnished', formData.furnished);
        formDatas.append('offer', formData.offer);
        formDatas.append('userRef', userRef);
        
        [...files].forEach((file) => {
            formDatas.append("photos", file);
        });

    
        
        if(formData.discountPrice >= formData.regularPrice){
            return console.log('discount price cannnot be the same or higher than regular price')
        }

        try {
            const result = await fetch("http://localhost:3500/api/createlisting", {
              method: "POST",
              body: formDatas,
            });
    
            const data = await result.json();

    
            console.log(data);
            toast.success('Listing created')
            navigate('/listings')
          } catch (error) {
            console.error(error);
            toast.error(`${error}`)
          }
    }

};


  return (
    <section className='p-5'>
        <h2>Create Listing</h2>
      
        <form onSubmit={handleFormSubmit} >
            <div className='flex flex-wrap items-center justify-center'>

                <label htmlFor='name'>Name: <br/>
                    <input type='text' placeholder='name' name='name' id='name'
                        value={formData.name} onChange={handleFormChange} required
                    />
                </label>

                <label htmlFor='desc'>Description: <br/>
                <textarea placeholder='description' name='desc' id='desc'   value={formData.desc} 
                 onChange={handleFormChange} required />
                </label>

                <label htmlFor='address'>Address: <br/>
                    <input type='text' placeholder='address' name='address' id='address'
                        value={formData.address} onChange={handleFormChange} required
                    />
                </label>

                <div className='flex space-between items-center w-[80%] mx-auto'>
                    <label htmlFor='type'>Type: <br/>
                        <select required  onChange={handleFormChange} name='type' value={formData.type} id='type'>
                            <option defaultValue={'rent'} >Rent</option> 
                            <option >Sell</option>
                        </select>
                    </label>
                    <label htmlFor='parkinglot'>parkinglot
                        <input type='checkbox' placeholder='parkinglot' name='parkingLot' className='mx-3'
                            value={formData.parkingLot} onChange={handleFormChange}  id='parkinglot'
                        />
                    </label>
                    <label htmlFor='furnished'>furnished
                        <input type='checkbox' placeholder='furnished' name='furnished' className='mx-3'
                            checked={formData.furnished} onChange={handleFormChange} id='furnished'
                        />
                    </label>
                    <label htmlFor='offer'>offer
                        <input type='checkbox' placeholder='offer' name='offer' className='mx-3'
                            value={formData.offer} onChange={handleFormChange}  id='offer' 
                        />
                    </label>
                </div>

                <label htmlFor='regularprice'> 
                {formData.type === 'Rent'? 'regularprice $ per Month' : 'regularprice $'}: <br/>
                    <input type='number' placeholder='regularprice' name='regularPrice' id='regularPrice'
                        value={formData.regularPrice} onChange={handleFormChange} min={50}  required
                    />
                </label>

                {formData.offer === true && 
                <label htmlFor='discountprice'>{formData.type === 'Rent'? 'discountedPrice $ per Month' : 'discountedPrice $'} <br/>
                    <input type='number' placeholder='discountprice' name='discountPrice' id='discountedPrice'
                        value={formData.discountPrice} onChange={handleFormChange} min={0} required 
                    />
                 </label>
                }
                
                <label htmlFor='bathroom'>bathroom: <br/>
                    <input type='number' placeholder='bathroom' name='bathroom' id='bathroom'
                        value={formData.bathroom} onChange={handleFormChange} min={1} required 
                    />
                </label>
                <label htmlFor='bedroom'>bedroom: <br/>
                    <input type='number' placeholder='bedroom' name='bedroom' id='bedroom'
                        value={formData.bedroom} onChange={handleFormChange} min={1} required
                    />
                </label>
                

                <label htmlFor='Photos'>photos must note be more than 6: <br />
                    <input type='file' accept='image/*' name='photos' id='photos'
                        onChange={handleFileChange} required multiple
                    />
                </label>
                
            </div>
            <button className='btn btn-sec w-full' disabled={status === 'uploading'}>
                Create Listing
            </button>
        </form>
        <Result status={status} />
        <ToastContainer 
            autoClose={1000}
            draggable
            theme='dark'
        />
    </section>
  )
}

export default CreateListing;
