import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './Components/Sidebar/Sidebar';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Doctor from './Components/User/doctor';
import Patients from './Components/User/patients'
import Exam from './Components/User/exam';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route
          path="/*"
          element={(
            <Sidebar>
              <Routes>
                <Route path="/sidebar" element={<Sidebar />} />
                <Route path="/exam" element={<Exam />} />
                <Route path="/doctor" element={<Doctor />} />
                <Route path="/patient" element={<Patients />} />
              </Routes>
            </Sidebar>
          )}
        />
      </Routes>
    </Router>
  );
}

export default App;