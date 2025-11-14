import React from 'react'
import {Link} from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';
import './Style.css'

const Login = () => {
    let [input, setInput] = useState({
        email:"",
        passWord:""
    });
    let [data, setData] = useState({});
    function fun1(e){
        let {name, value} = e.target;
        setInput({...input,[name]:value})
        // console.log(input);
    }
    async function done(){
        // setData(input);
        try{
            const res = await axios.post('http://localhost:4000/login',input);
            console.log("Server Response: ",res.data);
            alert(res.data)
        }
        catch(error){
            console.log("Error: ",error);
            alert(error)
        }
    }
  return (
    <div className='mainDiv'>
        <fieldset>
            <h1>Login</h1>
            <input type="email" name='email' value={input.email} onChange={fun1} placeholder='Enter your email'/>
            <input type="password" name='passWord' value={input.passWord} onChange={fun1} placeholder='Enter your password'/>
            <button onClick={done}>Login</button>
            <Link to={'/'} id='linkTag'>
                <p>Don't Have An Account?</p>
                <button>SignUp</button>
            </Link>
        </fieldset>
    </div>
  )
}

export default Login