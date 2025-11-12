import React from 'react'
import './All.css'
import { useState } from 'react'
import axios from 'axios'

const SendOtp = () => {
    let [mobile, setMobile] = useState({
        phoneNumber:""
    });
    function fun1(e){
        setMobile({...mobile,phoneNumber:e.target.value});
    }
    async function fun2(){
        try{
            let res = await axios.post("http://localhost:4000/sendOtp",mobile)
            alert(res.data.message+" "+res.data.otp);
            console.log(res.data);
        }
        catch(error){
            alert(error)
        }
    }
  return (
    <div>
        <h1>OTP Generator</h1>
        <div id='top'>
            <input name='phoneNumber' value={mobile.phoneNumber} onChange={fun1} type="text" placeholder='Enter mobile number with country code'/>
            <button onClick={fun2}>Send OTP</button>
        </div>
    </div>
  )
}

export default SendOtp