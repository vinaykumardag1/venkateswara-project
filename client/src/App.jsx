import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import Admin from './Admin/components/Admin'
import AdminLogin from './Admin/components/Login'
import Event from './Admin/components/Event'
import AdminHoliday from './Admin/Holiday/AdminHoliday'
import Holiday from './Admin/Holiday/Holiday'
import Student from './Admin/student/student'
import Events_holidays from './components/events_holidays'
import Student_Data from './components/Student_Data'
const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='/student-data' element={<Student_Data/>}/>
        <Route path='/events_holidays' element={<Events_holidays/>}/>
        <Route path='/login' element={<Login/>}/> 
        <Route path='/register' element={<Register/>}/>
        <Route path='/admin-login' element={<AdminLogin/>}/>
        <Route path='/admin' element={<Admin/>}/>
        <Route path='/events' element={<Event/>}/>
        <Route path='/holiday-admin' element={<AdminHoliday/>}/>
        <Route path='/holiday' element={<Holiday/>}/>
        <Route path='/student-admin' element={<Student/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
