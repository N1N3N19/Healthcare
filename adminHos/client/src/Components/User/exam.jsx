import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Axios from 'axios';
import { FaBan } from 'react-icons/fa';

export default function Exam() {
  const [examRows, setExamRows] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctorSearch, setDoctorSearch] = useState('');
  const [patientSearch, setPatientSearch] = useState('');

  useEffect(() => {
    // Fetch doctors
    Axios.get('http://localhost:3003/getdoctor')
      .then((response) => {
        console.log(response.data);
        setDoctors(response.data);
      })
      .catch((error) => {
        console.error('Error fetching doctors: ', error);
      });

    // Fetch patients
    Axios.get('http://localhost:3003/getpatients')
      .then((response) => {
        console.log(response.data);
        setPatients(response.data);
      })
      .catch((error) => {
        console.error('Error fetching patients: ', error);
      });

    // Fetch examination data
    Axios.get('http://localhost:3003/getexamination')
      .then((response) => {
        console.log(response.data);
        setExamRows(response.data);
      })
      .catch((error) => {
        console.error('Error fetching examination: ', error);
      });
  }, []);

  const deleteRow = (examination_ID) => {
    Axios.delete(`http://localhost:3003/docexamination/${examination_ID}`)
      .then(() => {
        setExamRows((prevRows) => prevRows.filter((row) => row.examination_ID !== examination_ID));
      })
      .catch((error) => {
        console.error(`There was an error deleting the examination: ${error}`);
      });
  };

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(doctorSearch.toLowerCase())
  );

  // Filter patients based on the search input
  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(patientSearch.toLowerCase())
  );

  const columns = [
    // Define columns for the DataGrid
    // ...
  ];

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <div>
        <input
          type="text"
          placeholder="Search Doctors"
          value={doctorSearch}
          onChange={(e) => setDoctorSearch(e.target.value)}
          style={{ marginBottom: '10px', padding: '5px' }}
        />
        <input
          type="text"
          placeholder="Search Patients"
          value={patientSearch}
          onChange={(e) => setPatientSearch(e.target.value)}
          style={{ marginBottom: '10px', padding: '5px' }}
        />
      </div>

      {/* Render your DataGrid here */}
      <DataGrid rows={examRows} columns={columns} pageSize={10} />
    </div>
  );
  
}
