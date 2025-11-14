import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-gray-900 text-white '>
      <div className="mycontainer flex items-center justify-between px-7 h-16 py-5">

        <div className='logo font-bold text-3xl'>

          <span className='text-blue-500'></span>
          Pass
          <span className='text-blue-500'>Manager</span>

        </div>
        {/* <ul>
          <li className='flex gap-4'>
            <a className='hover:font-bold' href="/">Home</a>
            <a className='hover:font-bold' href="#">About</a>
            <a className='hover:font-bold' href="#">Contact</a>
          </li>
        </ul> */}
        <button className='text-white bg-blue-600 hover:bg-blue-700 my-5 mx-2 rounded-full flex justify-between items-center'>
          <img className='invert w-8 p-1' src="/icons/github.svg" alt="github logo" />
          <span className='font-bold px-4'>Github</span>
        </button>
      </div>
    </nav>
  )
}

export default Navbar