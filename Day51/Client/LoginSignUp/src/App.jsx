import React from 'react'
import {Routes, Route} from 'react-router-dom'
import SignUp from './SignUp'
import Login from './Login'
import Private from './Private'
import Public from './Public'
import ForgetPassword from './ForgetPassword'
import ResetPassword from './ResetPassword'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<SignUp/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/public' element={<Public/>}></Route>
        <Route path='/private' element={<Private/>}></Route>
        <Route path='/forgetPass' element={<ForgetPassword/>}></Route>
        <Route path='/reset/:token' element={<ResetPassword/>}></Route>
      </Routes>
    </div>
  )
}

export default App