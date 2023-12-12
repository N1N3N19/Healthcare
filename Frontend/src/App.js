import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Registration from './regis';
import DocSignup from './DocSignup';
import DocLogin from './DocLogin';
import Dashboard from './Dashboard';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Registration/>} />
        <Route path='/Registration' element={<Registration/>} />
        <Route path='/DocSignin' element={<DocSignup/>} />
        <Route path='/DocLogin' element={<DocLogin/>}/>
        <Route path='/Dashboard' element={<Dashboard/>}/>
      </Routes>
    </Router>
  );
}

export default App;