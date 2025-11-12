import React from 'react'
import {Routes, Route} from 'react-router-dom'
import SendOtp from './SendOtp'
import Home from './Home'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/send-otp' element={<SendOtp/>}></Route>
      </Routes>
    </div>
  )
}

export default App