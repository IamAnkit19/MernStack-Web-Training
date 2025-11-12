import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
        <Link to={'/send-otp'}>
            <button>Try It</button>
        </Link>
    </div>
  )
}

export default Home