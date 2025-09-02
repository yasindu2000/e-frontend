import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Forget() {
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  async function sendOTP() {
    try {
      await axios.post(
        "http://localhost:5000/users/send-otp",
        { email: email }
      );
      toast.success("OTP sent successfully");
      setEmailSent(true);
    } catch {
      toast.error("Failed to send OTP");
    }
  }
  async function resetPassword() {
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      await axios.post(
        "http://localhost:5000/users/reset-password",
        {
          email: email,
          otp: otp,
          newPassword: newPassword,
        }
      );
      toast.success("Password reset successfully");
      navigate('/login')

    } catch {
      toast.error("Failed to reset password");
    }
  }

  return (
    <div className="w-full h-full flex justify-center items-center text-secondary">
      {!emailSent && (
        <div className="bg-primary w-[450px] h-[500px] shadow-2xl flex flex-col items-center justify-center p-[30px]  gap-[20px] rounded-[30px]">
          <h1 className="text-2xl font-semibold">Reset Password</h1>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-[350px] h-[40px] border focus:outline-0 shadow-sm border-gray-100 rounded-xl text-center"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            onClick={sendOTP}
            className="w-[350px] h-[40px] bg-blue-500 rounded-xl text-white text-lg mt-5 cursor-pointer hover:bg-blue-600 transition-all duration-300"
          >
            Send OTP
          </button>
        </div>
      )}
      {emailSent && (
        <div className="bg-primary w-[450px] h-[500px] shadow-2xl flex flex-col items-center justify-center gap-[20px] rounded-[30px]">
          <h1 className="text-2xl font-semibold">Verify OTP</h1>
          <input
            type="text"
            placeholder="Enter OTP"
            className="w-[350px] h-[40px] border focus:outline-0 shadow-sm border-gray-100 rounded-xl text-center"
            onChange={(e) => setOtp(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter new password"
            className="w-[350px] h-[40px] border focus:outline-0 shadow-sm border-gray-100 rounded-xl text-center"
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm new password"
            className="w-[350px] h-[40px] border focus:outline-0 shadow-sm border-gray-100 rounded-xl text-center"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            onClick={resetPassword}
            className="w-[350px] h-[40px] bg-blue-500 rounded-xl text-white text-lg mt-5 hover:bg-blue-600 transition-all duration-300"
          >
            Reset Password
          </button>
        </div>
      )}
    </div>
  );
}

export default Forget;
