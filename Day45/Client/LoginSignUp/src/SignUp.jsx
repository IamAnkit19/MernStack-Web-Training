import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './Style.css'

const SignUp = () => {
    let [input, setInput] = useState({
        userName:"",
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
            const res = await axios.post('http://localhost:4000/create',input);
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
            <h1>SignUp</h1>
            <input type="text" name='userName' value={input.userName} onChange={fun1} placeholder='Enter your UserName'/>
            <input type="email" name='email' value={input.email} onChange={fun1} placeholder='Enter your email'/>
            <input type="password" name='passWord' value={input.passWord} onChange={fun1} placeholder='Enter your password'/>
            <button onClick={done}>SignUp</button>
            <Link to={'/login'} id='linkTag'>
                <p>Already Have An Account?</p>
                <button>Login</button>
            </Link>
        </fieldset>
    </div>
  )
}

export default SignUp