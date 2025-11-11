import React from 'react'
import {Routes, Route} from 'react-router-dom'
import SignUp from './SignUp'
import Login from './Login'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<SignUp/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
      </Routes>
    </div>
  )
}

export default App