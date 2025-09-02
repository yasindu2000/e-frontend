
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import toast from "react-hot-toast";


function Register() {
  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("user");

  const navigate = useNavigate()
  
async function handleSubmit(){

  if (!firstName || !lastName || !email || !password) {
    toast.error("Please fill all required fields");
    return; // stop submission
  }

  const userData = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
    phone: phone,
    role: role
  }

  axios.post("http://localhost:5000/users",userData).then(
            (res)=>{
                
                toast.success("registered successfully");
                navigate("/login");
            }
        ).catch(
            (error)=>{
                console.error("Registered failed", error);
                toast.error("Registered failed");              
            }
        )

        console.log(productData);


}
  return (
    <div className="w-full h-screen bg-white bg-cover bg-center flex justify-center items-center">
      <div className="w-[500px] h-[650px] backdrop-blur-sm shadow-2xl rounded-[30px] gap-[5px] shadow-gray-500 text-gray-800 flex flex-col items-center justify-center">
        <h1 className="absolute top-[20px] text-3xl font-bold text-center my-1">
          Register
        </h1>

        {/* First Name */}
        <div className="w-[300px] flex flex-col mt-10">
          <span className="text-lg">First Name</span>
          <input
            name="firstName"
            value={firstName}
            onChange={(e)=>{setFirstName(e.target.value)}}
            type="text"
            className="w-[300px] h-[40px] border border-gray-300 shadow-sm rounded-xl focus:outline-none"
            required
          />
        </div>

        {/* Last Name */}
        <div className="w-[300px] flex flex-col">
          <span className="text-lg">Last Name</span>
          <input
            name="lastName"
            value={lastName}
            onChange={(e)=>{setLastName(e.target.value)}}
            type="text"
            className="w-[300px] h-[40px] border border-gray-300 shadow-sm rounded-xl focus:outline-none"
          required
          />
        </div>

        {/* Email */}
        <div className="w-[300px] flex flex-col">
          <span className="text-lg">Email</span>
          <input
            name="email"
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
            type="email"
            className="w-[300px] h-[40px] border border-gray-300 shadow-sm rounded-xl focus:outline-none"
          required
          />
        </div>

        {/* Password */}
        <div className="w-[300px] flex flex-col">
          <span className="text-lg">Password</span>
          <input
            name="password"
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
            type="password"
            className="w-[300px] h-[40px] border border-gray-300 shadow-sm rounded-xl focus:outline-none"
          required
          />
        </div>

        {/* Phone */}
        <div className="w-[300px] flex flex-col">
          <span className="text-lg">Phone</span>
          <input
            name="phone"
            value={phone}
            onChange={(e)=>{setPhone(e.target.value)}}
            type="text"
            className="w-[300px] h-[40px] border border-gray-300 shadow-sm rounded-xl focus:outline-none"
          />
        </div>

        {/* Role (select user/admin) */}
        <div className="w-[300px] flex flex-col">
          <span className="text-lg">Role</span>
          <select
            name="role"
            value={role}
            onChange={(e)=>{setRole(e.target.value)}}
            
            className="w-[300px] h-[40px] border border-gray-300 shadow-sm rounded-xl focus:outline-none"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        

        {/* Submit */}
        <button
          onClick={handleSubmit}
         
          className="w-[300px] h-[40px] bg-blue-500 rounded-xl text-white text-lg mt-5 hover:bg-blue-600 transition-all duration-300 cursor-pointer"
        >
          Register
        </button>

        <p>
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
