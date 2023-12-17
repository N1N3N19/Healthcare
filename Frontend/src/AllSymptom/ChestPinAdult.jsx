import React, { useEffect, useState } from 'react';
import neo4j from 'neo4j-driver';

import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('neo4j', '12345678'));


function  ChestPinAdult() {
    const [symptomData, setSymptomData] = useState([]);
    const [symptomData2, setSymptomData2] = useState([]);
    const [symptomData3, setSymptomData3] = useState([]);
    const [symptomData4, setSymptomData4] = useState([]);
    const [symptomData5, setSymptomData5] = useState([]);
    const [selectedPainDes,setSelectedPainDes] = useState([]);
    const [selectedProblem,setSelectedProblem] = useState([]);
    const [selectedTriggered,setSelectedTriggered] = useState([]);
    const [selectedRelieved,setSelectedRelieved] = useState([]);
    const [selectedAccompanied,setSelectedAccompanied] = useState([]);
    
    
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
     const symptom_ID = cookies.symptomID;
     const patient_ID = cookies.patient_ID;
     

    useEffect(() => {
        const fetchSymptoms = async () => {
            const session = driver.session();
            try {
              const result1 = await session.run('MATCH (n {SymptomID:3 })-[r:Pain_best_described_as]-(m) RETURN m.PainDesID, m.PainDesName');
              const options = result1.records.map(record => ({
                value: record.get('m.PainDesID'),
                label: record.get('m.PainDesName')
              }));

              const result2 = await session.run('MATCH (n {SymptomID:3 })-[r:Problem_is]-(m) RETURN m.ProblemID, m.ProblemName');
              const options2 = result2.records.map(record => ({
                value: record.get('m.ProblemID'),
                label: record.get('m.ProblemName')
              }));

              const result3 = await session.run('MATCH (n {SymptomID:3 })-[r:Triggered_or_worsened_by]-(m) RETURN m.TriggeredID, m.TriggeredName');
              const options3 =result3.records.map(record => ({
                value: record.get('m.TriggeredID'),
                label: record.get('m.TriggeredName')
              }));
              
              const result4 = await session.run('MATCH (n {SymptomID:3 })-[r:Relieved_by]-(m) RETURN m.RelievedID, m.RelievedName');
                const options4 =result4.records.map(record => ({
                    value: record.get('m.RelievedID'),
                    label: record.get('m.RelievedName')
                }));
                const result5 = await session.run('MATCH (n {SymptomID:3 })-[r:Accompanied_by]-(m) RETURN m.AccompaniedID, m.AccompaniedName');
                const options5 =result5.records.map(record => ({
                    value: record.get('m.AccompaniedID'),
                    label: record.get('m.AccompaniedName')
                }));
              setSymptomData(options);
              setSymptomData2(options2);
              setSymptomData3(options3);
              setSymptomData4(options4);
              setSymptomData5(options5);
            } finally {
              session.close();
            }
          };
        fetchSymptoms();
},[]); 
    

const handlePainDes = (event) => {
    if (event.target.checked) {
        setSelectedPainDes([...selectedPainDes, event.target.value]);
        console.log(selectedPainDes);
    } else {
        setSelectedPainDes(selectedPainDes.filter(pain => pain !== event.target.value));
        console.log(selectedPainDes);
    }
};

const handleProblem = (event) => {
    if (event.target.checked) {
        setSelectedProblem([...selectedProblem, event.target.value]);
        console.log(selectedProblem);
    } else {
        setSelectedProblem(selectedProblem.filter(pain => pain !== event.target.value));
        console.log(selectedProblem);
    }
};

const handleTriggered = (event) => {
    if (event.target.checked) {
        setSelectedTriggered([...selectedTriggered, event.target.value]);
        console.log(selectedTriggered);
    } else {
        setSelectedTriggered(selectedTriggered.filter(pain => pain !== event.target.value));
        console.log(selectedTriggered);
    }
};

const handleRelieved = (event) => {
    if (event.target.checked) {
        setSelectedRelieved([...selectedRelieved, event.target.value]);
        console.log(selectedRelieved);
    } else {
        setSelectedRelieved(selectedRelieved.filter(pain => pain !== event.target.value));
        console.log(selectedRelieved);
    }
};

const handleAccompanied = (event) => {
    if (event.target.checked) {
        setSelectedAccompanied([...selectedAccompanied, event.target.value]);
        console.log(selectedAccompanied);
    } else {
        setSelectedAccompanied(selectedAccompanied.filter(pain => pain !== event.target.value));
        console.log(selectedAccompanied);
    }
};
const Navigate = useNavigate();
const handleSubmit = async (e) => {
    e.preventDefault();
    const session = driver.session();
    const dataSymptomp = { patient_ID , symptom_ID, painDes_ID: selectedPainDes, Problem_ID: selectedProblem, triggered_ID: selectedTriggered, relieved_ID: selectedRelieved, accompanied_ID: selectedAccompanied};
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
        <h1>Chest pain in adult</h1>

        

        <form action="#" onSubmit={handleSubmit}>
            <div style={{ display: 'flex', flexDirection:'row' }}>
                <div className="form first" style={{ display: 'flex', flexDirection: 'column', maxWidth: '100%'}}>
                    <div className="details personal">
                        <h2>Pain best described as</h2>
                        <div className="select">
                                {symptomData.map((item, index) => (
                                    <div key={index} style={{ marginLeft: '10px', marginRight: '15px', marginBottom: '10px' }}>
                                        <input 
                                            type="checkbox" 
                                            id={`painDes-${item.value}`} 
                                            name={`painDes-${item.value}`} 
                                            value={item.value} 
                                            onChange={handlePainDes}
                                        />
                                        <label htmlFor={`painDes-${item.value}`}>{item.label}</label>
                                    </div>
                                ))}
                         </div>
                    </div>
                    <div className="details personal">
                        <h2>Problem is</h2>
                        <div className="select">
                                {symptomData2.map((item, index) => (
                              
                                    <div key={index} style={{ marginLeft: '10px', marginRight: '15px', marginBottom: '10px' }}>
                                        <input 
                                            type="checkbox" 
                                            id={`problem-${item.value}`} 
                                            name={`problem-${item.value}`} 
                                            value={item.value} 
                                            onChange={handleProblem}
                                        />
                                        <label htmlFor={`problem-${item.value}`}>{item.label}</label>
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
                                                <label htmlFor={`symptom-${item.value}`}>{item.label}</label>
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
                                            <label htmlFor={`symptom-${item.value}`}>{item.label}</label>
                                        </div>
                                    ))}
                            </div>
                    </div>
                    <button type="submit">Submit</button>
                </div>
                
            </div>
            
        </form>
    </div>
    );
}       



export default ChestPinAdult;