import React from 'react'
import { useState } from 'react';

const ForgetPassword = () => {
    let [input, setInput] = useState({
        email:""
    });
    function fun1(e){
        let {name, value} = e.target;
        setInput({...input,[name]:value})
        // console.log(input);
    }
  return (
    <div className='mainDiv'>
        <div className='fields'>
            <h1>Forget Password</h1>
            <input style={{width:"50vw"}} type="email" id='Femail' name='email' value={input.email} onChange={fun1} placeholder='Enter your Email'/>
        </div>
    </div>
  )
}

export default ForgetPassword