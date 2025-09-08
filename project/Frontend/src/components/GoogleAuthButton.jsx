import React from 'react'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { baseRequest } from '../utils/baseRequest';
import { loginSuccess } from '../redux/slice/authSlice';
import { GoogleLogin } from "@react-oauth/google";
import { toast } from 'react-toastify';

const GoogleAuthButton = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const handleSuccess = async (credentialResponse)=>{
        try {
            const token = credentialResponse.credential; 
            const res = await baseRequest.post("auth/google/", {
                token,
            })
            dispatch(loginSuccess(res.data))
            
            toast.success("Login successfully~!!")
            navigate("/")
            console.log("Login success:", res.data);
        } catch (error) {
            console.error("Google login error:", error);
            
        }
    }
  return (
    <div>
      <GoogleLogin
      onSuccess={handleSuccess}
      onError={()=>{
        console.log("Login Failed");
      }}/>
    </div>
  )
}

export default GoogleAuthButton
