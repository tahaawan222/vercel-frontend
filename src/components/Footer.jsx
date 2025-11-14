import React from 'react'

const Footer = () => {
  return (
    <div className='bg-gray-900 text-white flex flex-col justify-center items-center py-5  '>
       <div className='logo font-bold text-2xl '>

        <span className='text-blue-500'></span>
        Pass
        <span className='text-blue-500'>Manager</span>

      </div>
      <div className='flex justify-center items-center'>
     Created with <img className='w-5 mx-2' src="icons/heart.png" alt="" />by MR_Taha
      </div>
    </div>
  )
}

export default Footer