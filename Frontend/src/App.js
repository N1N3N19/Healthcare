import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Registration from './regis';
import DocSignup from './DocSignup';
import DocLogin from './DocLogin';
import Dashboard from './Dashboard';
import PatientSymptom from './patientSymptom';
import AbPinAdult from './AllSymptom/AbPinAdult';
import BloStinAdult from './AllSymptom/BloStinAdult';
import ChestPinAdult from './AllSymptom/ChestPinAdult';
import CoughinAdult from './AllSymptom/CoughinAdult';
import ConstipationinAdult from './AllSymptom/ConsinAdult';
import AbPinChild from './AllSymptom/AbPinChild';
import Result from './Result';
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
        <Route path='/patientSymptom' element={<PatientSymptom/>}/>
        <Route path='/symptom/1' element={<AbPinAdult/>}/>
        <Route path='/symptom/2' element={<BloStinAdult/>}/>
        <Route path='/symptom/3' element={<ChestPinAdult/>}/>
        <Route path='/symptom/4' element={<CoughinAdult/>}/>
        <Route path='/symptom/44' element={<ConstipationinAdult/>}/>
        <Route path='/symptom/27' element={<AbPinChild/>}/>
        <Route path='/result' element={<Result/>}/>
      </Routes>
    </Router>
  );
}

export default App;