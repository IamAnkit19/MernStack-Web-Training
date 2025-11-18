import axios from 'axios';
import React from 'react'
import { useState } from 'react';

const ForgetPassword = () => {
    let [input, setInput] = useState({
        email:""
    });
    function fun1(e){
        let {name, value} = e.target;
        setInput({...input,[name]:value})
        console.log(input);
    }
    async function fun2(){
        try{
            let res = await axios.post('http://localhost:4000/reset-password',input);
            alert(res.data)
        }
        catch(error){
            alert(error)
            console.log(error);
        }
    }
  return (
    <div className='mainDiv'>
        <div className='fields'>
            <h1>Forget Password</h1>
            <input style={{width:"380px"}} type="email" id='Femail' name='email' value={input.email} onChange={fun1} placeholder='Enter your Email'/>
            <button onClick={fun2} id='btn'>Send OTP</button>
        </div>
    </div>
  )
}

export default ForgetPassword