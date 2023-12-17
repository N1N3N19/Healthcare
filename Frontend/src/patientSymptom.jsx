import React, { useEffect, useState } from 'react';
import neo4j from 'neo4j-driver';

import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('neo4j', '12345678'));


function  PatientSymptom() {
    const [symptomData, setSymptomData] = useState([]);
    const [symptomData2, setSymptomData2] = useState([]);
    const [selectedSymptomID, setSelectedSymptomID] = useState([]);
    // const patient_ID = cookies.patient_ID;
    const [cookies, setCookie, removeCookie] = useCookies(['user']);

    useEffect(() => {
        const fetchSymptoms = async () => {
            const session = driver.session();
            try {
              const result1 = await session.run('MATCH (s:Adult)  RETURN s.SymptomName, s.SymptomID');
              const options = result1.records.map(record => ({
                value: record.get('s.SymptomID'),
                label: record.get('s.SymptomName')
              }));

              const result2 = await session.run('MATCH (s:Children)  RETURN s.SymptomName, s.SymptomID');
              const options2 = result2.records.map(record => ({
                value: record.get('s.SymptomID'),
                label: record.get('s.SymptomName')
              }));
              setSymptomData(options);
              setSymptomData2(options2);
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
    


    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const session = driver.session();
        // const dataSymptomp = { patient_ID: IDNumber , symptom_ID: selectedSymptomID };
       // console.log(dataTosend, dataSymptomp);
        
        try {
            // const response2 = await axios.post('http://localhost:5001/api/sym', dataSymptomp);
            // console.log(response2);
            
        } catch (error) {
            console.error(error.message);
          }
    }
return (
    <div className="container2">
        <h1>Welcome to our hospital!</h1>

        

        <form action="#" onSubmit={handleSubmit}>
            <div style={{ display: 'flex' }}>
                <div className="form first" style={{ display: 'flex', flexDirection: 'column', maxWidth: '50%', height: '410px', width: '670px' }}>
                    <div className="details personal">
                        <span className="title">In adults</span>

                        <div className="select">
                            
                           
                                <label > </label>
                                <br/>
                                {symptomData.map((item, index) => (
                                    <div key={index} style={{ marginLeft: '10px', marginRight: '15px', marginBottom: '10px' }}>
                                        <a 
                                        href={`/symptom/${item.value}`}
                                        onClick={() => setCookie('symptomID', index+1, {path: `/symptom/${item.value}`})}>
                                        
                                        {item.label}
                                        </a>
                                    </div>
                                ))}
                        </div>
                    </div>  
                </div>
                <div className="form second" style={{ display: 'flex', flexDirection: 'column', maxWidth: '50%', height: '410px', width: '670px' }} >
                    <label>In children</label>
                    <br/>
                        {symptomData2.map((item, index) => (
                        <div key={index} style={{ marginLeft: '10px', marginRight: '15px', marginBottom: '10px' }}>
                            <a 
                            href={`/symptom/${item.value}`}
                            onClick={() => setCookie('symptomID', index+1, {path: `/symptom/${item.value}`})}>
                            
                            {item.label}
                            </a>
                        </div>
                        ))}
                 </div>        
            </div>
            
        </form>
    </div>
    );
}       



export default PatientSymptom;