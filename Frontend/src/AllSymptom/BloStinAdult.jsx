import React, { useEffect, useState } from 'react';
import neo4j from 'neo4j-driver';

import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('neo4j', '12345678'));


function  BloStinAdult() {
    const [symptomData, setSymptomData] = useState([]);
    const [symptomData3, setSymptomData3] = useState([]);
    const [symptomData4, setSymptomData4] = useState([]);
    const [symptomData5, setSymptomData5] = useState([]);
    const [selectedBloodAppears, setSelectedBloodAppears] = useState([]);
    const [selectedTriggered, setSelectedTriggered] = useState([]);
    const [selectedRelieved, setSelectedRelieved] = useState([]);
    const [selectedAccompanied, setSelectedAccompanied] = useState([]);
    
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const patient_ID = cookies.patient_ID;
    const symptom_ID = cookies.symptomID;
    useEffect(() => {
        const fetchSymptoms = async () => {
            const session = driver.session();
            try {
              const result1 = await session.run('MATCH (n {SymptomID:2 })-[r:Blood_appears]-(m) RETURN m.AppearID, m.BloodAppearsName');
              const options = result1.records.map(record => ({
                value: record.get('m.AppearID'),
                label: record.get('m.BloodAppearsName')
              }));

              const result3 = await session.run('MATCH (n {SymptomID:2 })-[r:Triggered_or_worsened_by]-(m) RETURN m.TriggeredID, m.TriggeredName');
              const options3 =result3.records.map(record => ({
                value: record.get('m.TriggeredID'),
                label: record.get('m.TriggeredName')
              }));
              
              const result4 = await session.run('MATCH (n {SymptomID:2 })-[r:Relieved_by]-(m) RETURN m.RelievedID, m.RelievedName');
                const options4 =result4.records.map(record => ({
                    value: record.get('m.RelievedID'),
                    label: record.get('m.RelievedName')
                }));
                const result5 = await session.run('MATCH (n {SymptomID:2 })-[r:Accompanied_by]-(m) RETURN m.AccompaniedID, m.AccompaniedName');
                const options5 =result5.records.map(record => ({
                    value: record.get('m.AccompaniedID'),
                    label: record.get('m.AccompaniedName')
                }));
              setSymptomData(options);
            //   setSymptomData2(options2);
              setSymptomData3(options3);
              setSymptomData4(options4);
              setSymptomData5(options5);
            } finally {
              session.close();
            }
          };
        fetchSymptoms();
},[]); 
   
const handleBloodAppears = (e) => {
    if (e.target.checked) {
    setSelectedBloodAppears(prevState => [...prevState, e.target.value]);
    console.log(selectedBloodAppears);
    } else {
    setSelectedBloodAppears(prevState => prevState.filter(id => id !== e.target.value));
    console.log(selectedBloodAppears);
}

};

const handleTriggered = (e) => {
    if (e.target.checked) {
    setSelectedTriggered(prevState => [...prevState, e.target.value]);
    console.log(selectedTriggered);
    } else {
    setSelectedTriggered(prevState => prevState.filter(id => id !== e.target.value));
    console.log(selectedTriggered);
}

};

const handleRelieved = (e) => {
    if (e.target.checked) {
    setSelectedRelieved(prevState => [...prevState, e.target.value]);
    console.log(selectedRelieved);
    } else {
    setSelectedRelieved(prevState => prevState.filter(id => id !== e.target.value));
    console.log(selectedRelieved);
}

};

const handleAccompanied = (e) => {
    if (e.target.checked) {
    setSelectedAccompanied(prevState => [...prevState, e.target.value]);
    console.log(selectedAccompanied);
    } else {
    setSelectedAccompanied(prevState => prevState.filter(id => id !== e.target.value));
    console.log(selectedAccompanied);
}

};


    
const Navigate = useNavigate();
const handleSubmit = async (e) => {
    e.preventDefault();
    const session = driver.session();
    const dataSymptomp = { patient_ID , symptom_ID, BloodAppears_ID: selectedBloodAppears, triggered_ID: selectedTriggered, relieved_ID: selectedRelieved, accompanied_ID: selectedAccompanied};
    console.log(dataSymptomp);
    
    try {
        const response2 = await axios.post('http://localhost:5001/api/sym', dataSymptomp);
        console.log(response2.data);
        Navigate('/result', { state: {result: response2.data} })
    } catch (error) {
        console.error(error.message);
        }
}
return (
    <div className="container3">
        <h1>Blood in stool in adult</h1>

        

        <form action="#" onSubmit={handleSubmit}>
            <div style={{ display: 'flex', flexDirection:'column' }}>
                <div className="form first" style={{ display: 'flex', flexDirection: 'column', maxWidth: '100%'}}>
                    <div className="details personal">
                        <h2>Blood appears</h2>
                        <div className="select">
                                {symptomData.map((item, index) => (
                                    <div key={index} style={{ marginLeft: '10px', marginRight: '15px', marginBottom: '10px' }}>
                                        <input 
                                            type="checkbox" 
                                            id={`bloodAppears-${item.value}`} 
                                            name={`bloodAppears-${item.value}`} 
                                            value={item.value} 
                                            onChange={handleBloodAppears}
                                        />
                                        <label htmlFor={`bloodAppears-${item.value}`}>{item.label}</label>
                                    </div>
                                ))}
                         </div>
                    </div>
                  
                    <div className='details personal'>
                        <h2>Triggered or worsened by</h2>
                                <div className="select">
                                        {symptomData3.map((item, index) => (
                                    
                                            <div key={index} style={{ marginLeft: '10px', marginRight: '15px', marginBottom: '10px' }}>
                                                <input 
                                                    type="checkbox" 
                                                    id={`triggered-${item.value}`} 
                                                    name={`triggered-${item.value}`} 
                                                    value={item.value} 
                                                    onChange={handleTriggered}
                                                />
                                                <label htmlFor={`triggered-${item.value}`}>{item.label}</label>
                                            </div>
                                        ))}
                                </div>
                    </div>  
                </div>
                
                <div className='form second' style={{ display: 'flex', flexDirection: 'column', maxWidth: '100%' }} >
                    <div className='details personal'>
                    <h2>Relieved by</h2>
                            <div className="select">
                                    {symptomData4.map((item, index) => (
                                
                                        <div key={index} style={{ marginLeft: '10px', marginRight: '15px', marginBottom: '10px' }}>
                                            <input 
                                                type="checkbox" 
                                                id={`relieved-${item.value}`} 
                                                name={`relieved-${item.value}`} 
                                                value={item.value} 
                                                onChange={handleRelieved}
                                            />
                                            <label htmlFor={`relieved-${item.value}`}>{item.label}</label>
                                        </div>
                                    ))}
                            </div>
                    </div>

                    <div className='details personal'>
                    <h2>Accompanied by</h2>
                            <div className="select">
                                    {symptomData5.map((item, index) => (
                                
                                        <div key={index} style={{ marginLeft: '10px', marginRight: '15px', marginBottom: '10px' }}>
                                            <input 
                                                type="checkbox" 
                                                id={`accompanied-${item.value}`} 
                                                name={`accompanied-${item.value}`} 
                                                value={item.value} 
                                                onChange={handleAccompanied}
                                            />
                                            <label htmlFor={`accompanied-${item.value}`}>{item.label}</label>
                                        </div>
                                    ))}
                            </div>
                    </div>
                </div>
                <button type="submit">Submit</button>
            </div>
            
            
        </form>
    </div>
    );
}       



export default BloStinAdult;