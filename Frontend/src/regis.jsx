import React, { useEffect, useState } from 'react';
import neo4j from 'neo4j-driver';

import axios from 'axios';

const driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('neo4j', '12345678'));


function  Regis() {
    const [symptomData, setSymptomData] = useState([]);
   
    const [selectedSymptomID, setSelectedSymptomID] = useState([]);
    const [IDNumber, setIDNumber] = useState([]);
    const [FullName, setFullName] = useState([]);
    const [DOB, setDOB] = useState([]);
    const [Email, setEmail] = useState([]);
    const [Gender, setGender] = useState([]);
    const [MobileNumber, setMobileNumber] = useState([]);
    const [City, setCity] = useState([]);
    const [Occupation, setOccupation] = useState([]);
    const [password, setPassword] = useState([]);   

    useEffect(() => {
        const fetchSymptoms = async () => {
            const session = driver.session();
            try {
              const result = await session.run('MATCH (s:Symptom) RETURN s.SymptomName, s.SymptomID');
              const options = result.records.map(record => ({
                value: record.get('s.SymptomID'),
                label: record.get('s.SymptomName')
              }));
              setSymptomData(options);
            } finally {
              session.close();
            }
          };
        fetchSymptoms();
},[]); 
    const handleSymptomChange = (e) => {
        if (e.target.checked) {
        setSelectedSymptomID(prevState => [...prevState, e.target.value]);
        console.log(selectedSymptomID);
     
        } else {
        setSelectedSymptomID(prevState => prevState.filter(id => id !== e.target.value));
        console.log(selectedSymptomID);
    }
         
    }; 
    
    const handleIDNumberChange = (e) => { 
  
        setIDNumber(e.target.value);
        console.log(e.target.value);
    }

    const handleFullNameChange = (e) => {
        setFullName(e.target.value);
        console.log(e.target.value);
    }

    const handleDOBChange = (e) => {
        setDOB(e.target.value);
        console.log(e.target.value);
    }
    
    const handleGenderChange = (e) => {
        setGender(e.target.value);
        console.log(e.target.value);
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        console.log(e.target.value);
    }

    const handleMobileNumberChange = (e) => {
        setMobileNumber(e.target.value);
        console.log(e.target.value);
    }

    const handleCityChange = (e) => {
        setCity(e.target.value);
        console.log(e.target.value);
    }

    const handleOccupationChange = (e) => {
        setOccupation(e.target.value);
        console.log(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        console.log(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const session = driver.session();
        const dataSymptomp = { patient_ID: IDNumber , symptom_ID: selectedSymptomID };
        const dataTosend = { patient_ID: IDNumber, name: FullName, DOB, email: Email, gender: Gender, phone: MobileNumber, city: City, occupation: Occupation, password};
        console.log(dataTosend, dataSymptomp);
    
        try {
            const response1 = await axios.post('http://localhost:5001/api/Registration', dataTosend);
            const response2 = await axios.post('http://localhost:5001/api/sym', dataSymptomp);
            console.log(response1);
            console.log(response2);
        } catch (error) {
            console.error(error.message);
          }
    }
return (
    <div className="container">
        <h1>Welcome to our hospital!</h1>
        <header>Registration</header>
        

        <form action="#" onSubmit={handleSubmit}>
            <div className="form first">
                <div className="details personal">
                    <span className="title">Personal Details</span>

                    <div className="fields">
                        <div className="input-field">
                                <label>ID Number</label>
                                <input type="text" placeholder="Enter your ID No." required onChange={handleIDNumberChange}/>
                        </div>
                        <div className="input-field">
                            <label>Password</label>
                            <input type="password" placeholder="Enter your password" required onChange={handlePasswordChange}/>
                        </div>
                        <div className="input-field">
                            <label>Full Name</label>
                            <input type="text" placeholder="Enter your name" required onChange={handleFullNameChange}/>
                        </div>

                        <div className="input-field">
                            <label>Date of Birth</label>
                            <input type="date" placeholder="Enter birth date" required onChange={handleDOBChange}/>
                        </div>
                      
                        <div className="input-field">
                            <label>Email</label>
                            <input type="text" placeholder="Enter your email" required onChange={handleEmailChange}/>
                        </div>

                        <div className="input-field">
                            <label>Mobile Number</label>
                            <input type="number" placeholder="Enter mobile number" required onChange={handleMobileNumberChange}/>
                        </div>

                        <div className="input-field">
                            <label>Gender</label>
                            <select required onChange={handleGenderChange}>
                                <option disabled selected>Select gender</option>
                                <option>Male</option>
                                <option>Female</option>
                                <option>Others</option>
                            </select>
                        </div>
                        <div className="input-field">
                            <label>City</label>
                            <input type="text" placeholder="City" required onChange={handleCityChange}/>
                        </div>
                        <div className="input-field">
                            <label>Occupation</label>
                            <input type="text" placeholder="Enter your ccupation" required onChange={handleOccupationChange}/>
                        </div>
                        
                       
                        
                        <div style={{ display: 'flex', flexWrap: 'wrap' } }>
                        <label >Symptoms:   </label>
                        <br/>
                            {symptomData.map((item, index) => (
                                <div key={index} style={{ marginLeft: '10px', marginRight: '15px', marginBottom: '10px' }}>
                                <input
                                    type="checkbox"
                                    id={`checkbox${index}`}
                                    name="symptom"
                                    value={item.value}
                                    onChange={handleSymptomChange}
                                />
                                <label htmlFor={`checkbox${index}`}>{item.label}</label>
                                </div>
                            ))}
                            
                        </div>
                            <div >
                            <button type="submit" onSubmit={handleSubmit} >Submit</button>
                            </div>                 
                 
                        

                    </div>
                </div>

                
            </div>

            
        </form>
    </div>
    );
}       



export default Regis;