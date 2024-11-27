import React from 'react'
import Logo from '../assets/logo.png'
import { Link } from 'react-router-dom'
import './style.css'
const Navbar = () => {
  return (
    <section className='navbar '>
    <div className='container'>
      <div className='navbar w-100 d-flex   align-items-center'>
        <a className="navbar-brand" href='/'>
        
        <img src={Logo} alt='SVCN College logo' className='w-50'/>
        </a>
        <ul type="none" className='d-flex gap-5'>
            <li><Link to='/' className='nav-link'>Home</Link></li>
            <li><Link to='/events_holidays' className='nav-link'>Events & Holidays</Link></li>
            <li ><Link to='/student-data' className='nav-link'>Student Data</Link> </li>
           
        </ul>
      </div>
    </div>
    </section>
  )
}

export default Navbar
