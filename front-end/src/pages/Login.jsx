import { useState } from 'react'
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import toast from 'react-hot-toast';
import { IoCloseSharp } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';



//  secret -    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


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

   const login = useGoogleLogin({
        onSuccess: (response)=>{
            axios.post("http://localhost:5000/users/google-login",{
                token : response.access_token
            }).then(
                (response)=>{
                    console.log(response.data)
                    localStorage.setItem("token",response.data.token)
                    toast.success("Login successful")
                    if(response.data.role == "admin"){
                        navigate("/admin")
                    }else if(response.data.role == "user"){
                        navigate("/")
                    }
                }
            ).catch(
                ()=>{
                    toast.error("google login failed")
                }
            )
        }
    })

  const handleSubmit = ()=>{
    
    axios.post("http://localhost:5000/users/login",{
      email : email,
      password : password
    }).then((response)=>{
               console.log(response.data)
              //  alert("Login successful")
              localStorage.setItem("token",response.data.token)
              toast.success("Login Successful")
               if(response.data.role == "admin"){

                    
                    navigate("/admin")

                }else if(response.data.role == "user"){

                    
                    navigate("/")

                }
    }).catch((error)=>{
                console.log(error)
                // alert("login failed")
                toast.error("Login Failed")
    })
  }
  return (
    <div className="w-full h-screen bg-white bg-cover bg-center flex justify-center items-center">
			    
      <div className="w-[350px] h-[450px]  md:w-[450px] md:h-[550px] backdrop-blur-sm shadow-2xl shadow-gray-400 rounded-[30px]  gap-[20px] text-gray-800 flex flex-col items-center justify-center">
       <Link to={"/"} className='fixed right-[30px] top-[30px] text-gray-600 text-3xl ml-[90%]  cursor-pointer '  >
        <IoCloseSharp />
       </Link>
				<h1 className="absolute top-[20px] text-3xl font-bold text-center my-10">Login</h1>
      
        
                <div className="w-[300px]  flex flex-col mt-10">
                    <span className="text-lg ">Email</span>
                    <input onChange={(e)=>{
                      setEmail(e.target.value)

                    }} type="text"  className="w-[300px]  h-[40px] border border-gray-100 shadow-md rounded-xl focus:outline-none "/>
                </div>
                <div className="w-[300px]  flex flex-col">
                    <span className="text-lg ">Password</span>

                    <input onChange={(e)=>{
                          setPassword(e.target.value)
                    }} type="password"   className=" w-[300px] h-[40px] border border-gray-100 shadow-md rounded-xl focus:outline-none"/>
                      <Link to="/forget"><p className="underline text-blue-600 mt-1 text-[15px] ml-[160px]">forget password?</p></Link>
                </div>
                
                <button onClick={handleSubmit} className="w-[300px] h-[40px] bg-blue-500 rounded-xl text-white text-lg mt-1 hover:bg-blue-600 transition-all duration-300 cursor-pointer">
                    Login
                </button>
                <div className="flex flex-row  w-[150px] rounded-2xl p-1 justify-center relative items-center">
                  

                <button  onClick={login} className="w-[300px] ml-6 rounded-xl  text-lg text-black cursor-pointer items-center justify-center">
                    <FcGoogle className='text-3xl   absolute p-[2px]' />Google
                </button>
                </div>
                <div className="">
                <p className=''>Don't have an account? <Link to="/register" className="text-blue-500">Sign up</Link></p>
                </div>
			</div>
		</div>
  )
}

export default Login