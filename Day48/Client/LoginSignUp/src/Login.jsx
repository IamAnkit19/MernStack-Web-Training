import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';
import './Style.css'

const Login = () => {
    let [input, setInput] = useState({
        email:"",
        passWord:""
    });
    let [token, setToken] = useState("")
    let navigate = useNavigate();
    // let [data, setData] = useState({});
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
            setToken(res.data);
            // navigate('/public')
        }
        catch(error){
            console.log("Error: ",error);
            alert(error)
        }
    }
  return (
    <div className='mainDiv'>
        <div>
            <fieldset>
                <h1>Login</h1>
                <div className='fields'>
                    <label htmlFor="email">Email</label>
                    <input type="email" id='email' name='email' value={input.email} onChange={fun1} placeholder='Enter your Email'/>
                </div>
                <div className='fields'>
                    <label htmlFor="passWord">Password</label>
                    <input type="password" id='passWord' name='passWord' value={input.passWord} onChange={fun1} placeholder='Enter your Password'/>
                </div>
                <button onClick={done}>Login</button>
                <Link to={'/'} id='linkTag'>
                    <p>Don't Have An Account?</p>
                    <button>SignUp</button>
                </Link>
            </fieldset>
        </div>
        {
            token ? <>
            <p>Copy This Token: {token}</p>
            <Link to={'/public'}>
                <button id='btn'>Go To Public Page</button>
            </Link>
            </>
            :
            <></>
        }
    </div>
  )
}

export default Login