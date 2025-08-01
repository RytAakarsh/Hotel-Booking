import React from 'react'
import { assets, cities } from '../assets/assets'
import { useAppContext } from '../context/AppContext.jsx'
import { useState } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useUser, SignedIn, SignedOut } from "@clerk/clerk-react";



const HotelReg = () => {

   const {setShowHotelReg , axiox , getToken , setIsOwner } = useAppContext()

   const [name , setName ] = useState("")
   const [ address , setAddress ] = useState("")
   const [contact , setContact ] = useState("")
   const [city , setCity ] = useState("")


   const onSubmitHandler = async (event) => {
    try {
        const token = await getToken();
        console.log("🔐 TOKEN:", token);  
        event.preventDefault();
        const {data} = await axios.post(`/api/hotels/` , {name , address , contact , city} , {headers: {Authorization: `Bearer ${await getToken()}`}})

        if(data.success){
            toast.success(data.message)
            setIsOwner(true)
            setShowHotelReg(false)
        }else {
            toast.error(data.message)
        }
    } catch (error) {
        toast.error(error.message)
    }
   }

  return (
    <div onClick={() => setShowHotelReg(false)} className='fixed
    top-0 bottom-0 left-0 right-0 z-100 flex items-center justify-center bg-black/70'>
        <form onSubmit={onSubmitHandler} onClick={(e) => e.stopPropagation()} className='flex bg-white rounded-xl max-w-4xl max-md:mx-2'>
               <img  src={assets.regImage} alt='rwg-image' className='w-1/2 rounded-xl hidden md:block' />

               <div className='relative flex flex-col items-center md:w-1/2 p-8 md:p-10'>
                  <img src={assets.closeIcon} alt='close-icon' className='absolute top-4 right-4 h-4 w-4 cursor-pointer' onClick={() => setShowHotelReg(false)} />
                  <p className='text-2xl font-semibold mt-6'>Register Your Hotel</p>

                  <SignedIn>
      ✅ Signed in as {useUser().user?.emailAddresses?.[0]?.emailAddress}
    </SignedIn>
    <SignedOut>
      ❌ You are not signed in
    </SignedOut>

    <div onClick={() => setShowHotelReg(false)} className='fixed top-0 bottom-0 ...'>
      {/* rest of your form */}
    </div>


                  {/* hotel Name */}
                <div className='w-full mt-4'>
                    <label htmlFor='name' className='font-medium text-gray-500 '>Hotel Name</label>
                    <input type='text' onChange={(e) => setName(e.target.value)} value={name} id='name' placeholder='Type Here' className='border border-gray-200 rounded w-full  px-3 py-2.5 mt-1 outline-indigo-500 font-light' required />
                </div>

                <div className='w-full mt-4'>
                    <label htmlFor='contact' className='font-medium text-gray-500 '>Phone</label>
                    <input type='text' onChange={(e) => setContact(e.target.value)} value={contact} id='contact' placeholder='Type Here' className='border border-gray-200 rounded w-full  px-3 py-2.5 mt-1 outline-indigo-500 font-light' required />
                </div>


                <div className='w-full mt-4'>
                    <label htmlFor='address' className='font-medium text-gray-500 '>Address</label>
                    <input type='text' id='address' onChange={(e) => setAddress(e.target.value)} value={address} placeholder='Type Here' className='border border-gray-200 rounded w-full  px-3 py-2.5 mt-1 outline-indigo-500 font-light' required />
                </div>
                
            {/* Select city drop down */}

            <div className='w-full mt-4 max-w-60 mr-auto'>
                <label htmlFor='city' className='font-medium text-gray-500 '>City</label>
                <select onChange={(e) => setCity(e.target.value)} value={city} id='city' className='border border-gray-200 rounded w-full  px-3 py-2.5 mt-1 outline-indigo-500 font-light' required>
                    <option value="" >Select City</option>
                    {cities.map((city) => (
                        <option key={city} value={city}>{city}</option>
                    ))}
                </select>
            </div>
                   <button className='bg-indigo-500 hover:bg-indigo-600 transition-all text-white mr-auto px-6 py-2 rounded cursor-pointer mt-6'> 
                    Register
                   </button>
               </div>
        </form>
    </div>
  )
}

export default HotelReg