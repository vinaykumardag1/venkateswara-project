import React from 'react'
import Logo from '../assets/logo.png'
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <div className='container'>
      <div className='navbar d-flex justify-content-between'>
        <a className="navbar-brand" href='/'>
        
        <img src={Logo} alt='SVCN College logo'/>
        </a>
        <ul type="none" className='d-flex gap-5'>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/events_holidays'>Events & Holidays</Link></li>
           
        </ul>
      </div>
    </div>
  )
}

export default Navbar
