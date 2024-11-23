import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import Dashboard from './components/dashboard'
import Admin from './Admin/components/Admin'
import AdminLogin from './Admin/components/Login'
import Event from './Admin/components/Event'
import AdminHoliday from './Admin/Holiday/AdminHoliday'
import Holiday from './Admin/Holiday/Holiday'
const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/> 
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/admin-login' element={<AdminLogin/>}/>
        <Route path='/admin' element={<Admin/>}/>
        <Route path='/events' element={<Event/>}/>
        <Route path='/holiday-admin' element={<AdminHoliday/>}/>
        <Route path='/holiday' element={<Holiday/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
