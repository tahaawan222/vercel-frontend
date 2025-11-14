import React from 'react'
import { useRef, useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])

    const getPasswords = async () => {
        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json()
        setPasswordArray(passwords)
    }


    useEffect(() => {
        getPasswords()
    }, [])


    const copyText = (text) => {
        toast('Copied to clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text)
    }

    const showPassword = () => {
        passwordRef.current.type = "text"
        console.log(ref.current.src)
        if (ref.current.src.includes("icons/eyecross.png")) {
            ref.current.src = "icons/eye.png"
            passwordRef.current.type = "password"
        }
        else {
            passwordRef.current.type = "text"
            ref.current.src = "icons/eyecross.png"
        }

    }

    const savePassword = async () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {

            // If any such id exists in the db, delete it 
            await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: form.id }) })

            setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            await fetch("http://localhost:3000/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, id: uuidv4() }) })

            // Otherwise clear the form and show toast
            setform({ site: "", username: "", password: "" })
            toast('Password saved!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
        else {
            toast('Error: Password not saved!');
        }

    }

    const deletePassword = async (id) => {
        console.log("Deleting password with id ", id)
        let c = confirm("Do you really want to delete this password?")
        if (c) {
            setPasswordArray(passwordArray.filter(item => item.id !== id))
            
            await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })

            toast('Password Deleted!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true, 
                draggable: true,
                pauseOnHover: true, // This was missing in your original code but kept for consistency with other toasts
                progress: undefined,
                theme: "dark",
            });
        }

    }

    const editPassword = (id) => {
        setform({ ...passwordArray.filter(i => i.id === id)[0], id: id })
        setPasswordArray(passwordArray.filter(item => item.id !== id))
    }


    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

  return (
   <div className="flex-grow relative"> 
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark" // Changed
        transition="Bounce"
      />

      {/* Background Changed */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-gray-950 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-size:14px_24px"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-blue-900 opacity-20 blur-[100px]"></div></div>
      
      {/* Main Container - Added text-white */}
      <div className=" p-3 pt-7 md:mycontainer text-white min-h-[88.2vh]">
        <h1 className='text-4xl font-bold text-center'>
          <span className='text-blue-500'></span>
          Pass
          <span className='text-blue-500'>Manger</span>
        </h1>
        <p className='text-gray-300 text-lg text-center'>Your own password manager</p>
        
        {/* Form - Removed text-black, inputs restyled */}
        <div className=' flex flex-col p-4 gap-8 items-center'>
          <input value={form.site} onChange={handleChange} placeholder='Enter website URL' className='bg-gray-800 rounded-full border border-gray-700 w-full p-4 py-1 text-white placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500' type="text" name="site" id="site" />
          <div className="flex flex-col md:flex-row w-full justify-between gap-8">
            <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='bg-gray-800 rounded-full border border-gray-700 w-full p-4 py-1 text-white placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500' type="text" name="username" id="username" />
            <div className="relative w-full"> {/* Added w-full here */}
              <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className='bg-gray-800 rounded-full border border-gray-700 w-full p-4 py-1 text-white placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500' type="password" name="password" id="password" />
              {/* Fixed class typo and added invert */}
              <span className='absolute right-[3px] top-[4px] cursor-pointer' onClick={showPassword}>
                <img ref={ref} className='p-1 invert' width={26} src="icons/eye.png" alt="eye" />
              </span>
            </div>
          </div>
          
          {/* Button Changed */}
          <button onClick={savePassword} className='flex justify-center items-center bg-blue-600 rounded-full px-8 py-2 w-fit hover:bg-blue-700 gap-2 border border-blue-800'>
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
              colors="primary:#ffffff" // Set icon color to white
            >
            </lord-icon>
            Save Password</button>
        </div>
        
        {/* Table Changed */}
        <div className="password">
          <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
          {passwordArray.length === 0 && <div>No passwords to show</div>}
          {passwordArray.length !== 0 && <table className="table-auto w-full rounded-md overflow-hidden mb-10">
            <thead className='bg-gray-900 text-white'>
              <tr>
                <th className='py-2'>Site</th>
                <th className='py-2'>Username</th>
                <th className='py-2'>Password</th>
                <th className='py-2'>Actions</th>
              </tr>
            </thead>
            <tbody className='bg-gray-800'>
              {passwordArray.map((item, index) => {
                return <tr key={index}>
                  <td className='py-2 border border-gray-700 text-center'>
                    <div className='flex items-center justify-center'>
                      <a href={item.site} target='_blank' className='hover:underline'>{item.site}</a>
                      <div className=' lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.site) }}>
                        <lord-icon
                          style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                          src="https://cdn.lordicon.com/iykgtsbt.json"
                          trigger="hover"
                          colors="primary:#ffffff">
                        </lord-icon>
                      </div>
                    </div>
                  </td>
                  <td className='py-2 border border-gray-700 text-center'>
                    <div className='justify-center items-center flex'>
                      <span>{item.username}</span>
                      <div className=' lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.username) }}>
                        <lord-icon
                          style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                          src="https://cdn.lordicon.com/iykgtsbt.json"
                          trigger="hover"
                          colors="primary:#ffffff">
                        </lord-icon>
                      </div>
                    </div>
                  </td>
                  <td className='py-2 border border-gray-700 text-center'>
                    <div className='flex items-center justify-center'>
                      <span>{"*".repeat(item.password.length)}</span>
                      <div className=' lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.password) }}>
                        <lord-icon
                          style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                          src="https://cdn.lordicon.com/iykgtsbt.json"
                          trigger="hover"
                          colors="primary:#ffffff">
                        </lord-icon>
                      </div>
                    </div>
                  </td>
                  <td className='justify-center py-2 border border-gray-700 text-center'>
                    <span className='cursor-pointer mx-1' onClick={() => { editPassword(item.id) }}>
                      <lord-icon
                        src="https://cdn.lordicon.com/gwlusjdu.json"
                        trigger="hover"
                        style={{ "width": "25px", "height": "25px" }}
                        colors="primary:#ffffff">
                      </lord-icon>
                    </span>
                    <span className='cursor-pointer mx-1' onClick={() => { deletePassword(item.id) }}>
                      <lord-icon
                        src="https://cdn.lordicon.com/skkahier.json"
                        trigger="hover"
                        style={{ "width": "25px", "height": "25px" }}
                        colors="primary:#ffffff">
                      </lord-icon>
                    </span>
                  </td>
                </tr>
              })}
            </tbody>
          </table>}
        </div>
      </div>
    </div>
  )
}

export default Manager