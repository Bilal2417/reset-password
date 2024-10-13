"use client"
import { useState, useRef } from 'react';
import "./../verification.css"
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import ReduxProvider from '@/components/reduxProvider/reduxProvider';
import { useParams, useRouter } from 'next/navigation';

export default () => {
    return <ReduxProvider>
        <OTPInput/>
    </ReduxProvider>
}
const OTPInput = () => {
  let route = useRouter()
  let params = useParams()
    let getOtp = useSelector((store)=>{
        return store.logSlice.otp
    })
  const [otp, setOtp] = useState(Array(6).fill(''));
  const inputRefs = useRef([]);
  const handleChange = (event, index) => {
    const { value } = event.target;

    if (/^[0-9A-Za-z]$/.test(value) || value === '') {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Focus on the next input if a value is entered
      if (value && index < otp.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (event, index) => {
    if (event.key === 'Backspace') {
      if (index > 0 && otp[index] === '') {
        inputRefs.current[index - 1].focus();
      }
    }
  };
const checkOtp= () => {
    const myOtp = Number(otp.join(''));
    if(myOtp == getOtp){
      route.push("/newPass/" + params.Id)
                toast.success("Correct Otp")
            }else{
                toast.error("Incorrect Otp")
    }
    // console.log(otp)
}
  return (
   
    <div className="otpContainer">
      <h6 className="otpHeader">
        Please enter the one-time password <br /> to verify your account
      </h6>
      <div className="otpInfo">
        <span>A code has been sent to</span> <small>*******gmail.com</small>
      </div>
      <div className='flexing'>
      <div className="otpInputs">
        {otp.map((value, index) => (
            <input
            key={index}
            id={`otp-input-${index}`}
            ref={(el) => (inputRefs.current[index] = el)}
            value={value}
            onChange={(event) => handleChange(event, index)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            maxLength={1}
            className="otpInput"
          />
        ))}
            </div>
        <div class="mt-4">
             <button onClick={checkOtp} class="btn btn-danger px-4 validate">Validate</button>
         </div>
      </div>
    </div>
  );
};

