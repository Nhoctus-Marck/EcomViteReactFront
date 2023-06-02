import React, { useState } from 'react'
import {BiShow} from 'react-icons/bi'
import {BiHide} from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom'
import { ImageToBase64 } from '../utility/imageToBase64'
import imgUpload from '../assets/default.png'

axios.defaults.baseURL = process.env.REACT_APP_API_URL || "http://localhost:8080";


const SignUp = () => {
    const navigate = useNavigate()
    const [showPassword,setShowPassword] = useState(false)
    const [showConfirmPassword,setConfirmShowPassword] = useState(false)
    const [data,setData] = useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        confirmPassword:"",
        image: ""
    })
    const handleShowPassword = () => {
        setShowPassword(preve => !preve)
    }
    const handleShowConfirmPassword = () => {
        setConfirmShowPassword(preve => !preve)
    }

    const handleOnChange = (e) => {
        const {name,value} = e.target
        setData((preve)=>{
            return{
                ...preve,
                [name] : value
            }
        })
    }
    const handleUploadProfileImage = async(e) => {
        // console.log(e.target.files[0]);
        const data = await ImageToBase64(e.target.files[0])
        // console.log(data);
        setData((preve)=>{
            return{
                ...preve,
                image: data
            }
        })
    }
    const handleSubmit = async(e)=>{
        e.preventDefault()
        const {firstName,email,password,confirmPassword} = data
        if(firstName && email && password && confirmPassword){
            if(password === confirmPassword){
                const fetchData = await fetch(`axios.defaults.baseURL/signup`,{
                    method : "POST",
                    headers : {
                      "content-type" : "application/json"
                    },
                    body : JSON.stringify(data)
                  })
                  const dataRes = await fetchData.json()
                console.log(dataRes);
                alert("successfull")
                navigate("/login")
            }
            else{
                alert("password and confirm password not equal")
            }
        }
        else{
            alert("Please Enter required fields")
        }
    }

  return (
    <div className='p-3 md:p-4'>
        <div className='w-full max-w-sm bg-white m-auto flex  flex-col p-4'>
            <h5 className='text-center text-2xl font-bold'>Sign Up</h5>
            <div className="w-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto relative">
                <img className='w-full h-full' src={data.image ? data.image : imgUpload} alt="" />
            <label htmlFor="profileImage">
                <div className='absolute bottom-0 h-1/2 bg-slate-500 bg-opacity-50 w-full text-center cursor-pointer'>
                    <p className='text-sm p-1 text-white'>Upload</p>
                </div>
                <input type={"file"} id='profileImage' accept='image/*' className='hidden' onChange={handleUploadProfileImage}/>
            </label>
            </div>
            <form className='w-full py-3 flex flex-col' onSubmit={handleSubmit}>
                <label htmlFor="firstName" className=''>First Name</label>
                <input type={"text"} id='firstName'name='firstName'value={data.firstName} onChange={handleOnChange} className='mt-1 mb-2 w-full bg-slate-200 px-2 py-2 rounded focus-within:outline-blue-500
                '/>
                <label htmlFor="lastName">Last Name</label>
                <input type={"text"} id='lastName'name='lastName'value={data.lastName} onChange={handleOnChange} className='mt-1 mb-2 w-full bg-slate-200 px-2 py-2 rounded  focus-within:outline-blue-500
                '/>
                <label htmlFor="email">Email</label>
                <input type={"email"} id='email'name='email'value={data.email} onChange={handleOnChange} className='mt-1 mb-2 w-full bg-slate-200 px-2 py-2 rounded  focus-within:outline-blue-500
                '/>
                <label htmlFor="password">Password</label>
                <div className='flex px-2 py-2 mt-1 mb-2 rounded bg-slate-200 focus-within:outline focus-within:outline-blue-500'>
                    <input type={showPassword ? "text" : "password"} id='password'name='password'value={data.password} onChange={handleOnChange} className=' w-full bg-slate-200 border-none outline-none 
                    '/>
                    <span className='flex text-xl' onClick={handleShowPassword}>{showPassword ?<BiShow/>:<BiHide/>}</span>
                </div> 
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className='flex px-2 py-2 mt-1 mb-2 rounded bg-slate-200 outline focus-within:outline focus-within:outline-blue-500'>
                    <input type={showConfirmPassword ? "text" : "password"} id='confirmPassword'name='confirmPassword'value={data.confirmPassword} onChange={handleOnChange} className=' w-full bg-slate-200 border-none outline-none 
                    '/>
                    <span className='flex text-xl' onClick={handleShowConfirmPassword}>{showConfirmPassword ?<BiShow/>:<BiHide/>}</span>
                </div>
                <button type='submit' className='w-full max-w-[150px] text-white text-xl font-medium text-center py-1 rounded-full mt-4 m-auto bg-red-500 hover:bg-red-600 cursor-pointer'>Sign Up</button>
            </form>
            <p className='text-left text-sm mt-2 '>Already have account? <Link to={'/login'} className='text-red-500 underline'>Login</Link></p>
        </div>
    </div>
    
  )
}

export default SignUp