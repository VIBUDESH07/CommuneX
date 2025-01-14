import React from 'react'
import { Link } from 'react-router-dom'
import { FaBars } from 'react-icons/fa'

const Head = () => {
  return (
    <div className="header">
      <h2>CommuneX</h2>
      <div className='header-nav'>
        <Link to="/about">About</Link>
        <Link to="/about">Services</Link>
        <Link to="/contact">Contact</Link>
      </div>
      <div className='btn'>
        <Link to="/login">
          <button className='sign'>Sign IN</button>
        </Link>
        <Link to="/signup">
          <button className='sign'>Sign Up</button>
        </Link>
      </div>
    </div>
  )
}

export default Head

