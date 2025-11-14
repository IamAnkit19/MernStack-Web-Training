import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'

const Private = () => {
    useEffect(()=>{
        let token = prompt("Enter login token: ")
        async function fun1() {
            try{
                let res = await axios.get("http://localhost:4000/private",{headers:{"Authorization":`${token}`}})
                alert(res.data)
            }
            catch(error){
                alert(error)
            }
        }
        fun1()
    })
  return (
    <div>Private Page</div>
  )
}

export default Private