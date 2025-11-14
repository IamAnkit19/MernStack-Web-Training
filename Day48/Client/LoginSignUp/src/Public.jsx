import React from 'react'
import { Link } from 'react-router-dom'

const Public = () => {
  return (
    <div>
        <h1>Public Page</h1>
        <Link to={'/private'}>
            <button id='btn'>Go To Private Page</button>
        </Link>
    </div>
  )
}

export default Public