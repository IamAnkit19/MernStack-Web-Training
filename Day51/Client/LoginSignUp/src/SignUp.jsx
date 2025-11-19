import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './Style.css'

const SignUp = () => {
    let [input, setInput] = useState({
        userName:"",
        email:"",
        passWord:"",
        role:""
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
            <div className='fields'>
                <label htmlFor="userName">Username</label>
                <input type="text" id='userName' name='userName' value={input.userName} onChange={fun1} placeholder='Enter your UserName'/>
            </div>
            <div className='fields'>
                <label htmlFor="email">Email</label>
                <input type="email" id='email' name='email' value={input.email} onChange={fun1} placeholder='Enter your Email'/>
            </div>
            <div className='fields'>
                <label htmlFor="passWord">Password</label>
                <input type="password" id='passWord' name='passWord' value={input.passWord} onChange={fun1} placeholder='Enter your Password'/>
            </div>
            <div className='fields'>
                <label htmlFor="role">Choose a Role </label>
                <select name="role" id="role" onChange={fun1}>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="instructor">Instructor</option>
                </select>
            </div>
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