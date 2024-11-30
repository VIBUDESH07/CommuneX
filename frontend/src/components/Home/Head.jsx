import React from 'react'
import {Link} from 'react-router-dom'
import {FaBars, FaTools} from 'react-icons/fa'
const Head = () => {
  return (
    <div>
        <div className="header">
          <FaBars/>
         <h2>SkyConnect</h2>
        <div className='header-nav'>
          <Link to="/about">
           About
          </Link>
          <Link to="/about">
           Services
          </Link>
          <Link to="/contact">
           Contact
          </Link>
        </div>
        <div className='btn'>
            <button className='sign'>Sign IN</button>
            <button className="sign">Sign Up</button>
        </div>
       </div>
    </div>
  )
}

export default Head
