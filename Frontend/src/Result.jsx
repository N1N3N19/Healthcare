import React, { useEffect, useState } from 'react';
import neo4j from 'neo4j-driver';

import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useLocation } from 'react-router-dom';

const driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('neo4j', '12345678'));


function  Result() {
    
    const [symptomData, setSymptomData] = useState([]);
    const [symptomData2, setSymptomData2] = useState([]);
    const location = useLocation();
    const result = location.state.result;
    console.log(result);
    // const patient_ID = cookies.patient_ID;
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
   
    useEffect(() => {
        const fetchSymptoms = async () => {
            const session = driver.session();
            try {
            //   const result1 = await session.run('MATCH (s:Adult)  RETURN s.SymptomName, s.SymptomID');
            //   const options = result1.records.map(record => ({
            //     value: record.get('s.SymptomID'),
            //     label: record.get('s.SymptomName')
            //   }));

            //   setSymptomData(options);
           
            } finally {
              session.close();
            }
          };
        fetchSymptoms();
},[]); 
    
    


    
return (
    <div className="container5">
        <h1></h1>

        

        <form action="#" >
            <div style={{ display: 'flex' }}>
                <div className="form first" style={{ display: 'flex', flexDirection: 'column', maxWidth: '50%', height: '410px', width: '670px' }}>
                    <div className="details personal">
                        <h2 className="title">Result</h2>

                        <div className="select">
                            {result.map((item, index) => (
                                    <div key={index}>
                                        <label>{item.DiseaseName}: {item.symptomCount} </label>
                                      
                                    </div>
                                ))}
                           
                            
                        </div>
                    </div>  
                </div>
                
            </div>
            
        </form>
    </div>
    );
}       



export default Result;