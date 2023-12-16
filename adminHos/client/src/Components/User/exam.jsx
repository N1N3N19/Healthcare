import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Axios from 'axios';
import { FaBan } from 'react-icons/fa';

const Exam = () => {
  const [rows, setRows] = useState([]);
  const [searchDoctorValue, setSearchDoctorValue] = useState('');
  const [searchPatientValue, setSearchPatientValue] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [filteredRows, setFilteredRows] = useState([]);


  // Fetch doctors based on search value
  useEffect(() => {
    if (searchDoctorValue) {
      Axios.get(`http://localhost:3003/getdoctor/${searchDoctorValue}`)
        .then((response) => {
          setDoctors(response.data);
        })
        .catch((error) => {
          console.error('Error fetching doctors: ', error);
        });
    }
  }, [searchDoctorValue]);

  // Fetch patients based on search value
  useEffect(() => {
    if (searchPatientValue) {
      Axios.get(`http://localhost:3003/getpatients/${searchPatientValue}`)
        .then((response) => {
          setPatients(response.data);
        })
        .catch((error) => {
          console.error('Error fetching patients: ', error);
        });
    }
  }, [searchPatientValue]);

  useEffect(() => {
    Axios.get('http://localhost:3003/getexamination')
      .then(response => {
        const dataWithIds = response.data.map((item, index) => ({ id: index, ...item }));
        setFilteredRows(dataWithIds);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const deleteRow = (idToDelete) => {
    Axios.delete(`http://localhost:3003/deleteexamination/${idToDelete}`)
      .then(response => {
        console.log(response.data);
        // Refresh the data in your table here
      })
      .catch(error => {
        console.error(error);
      });
  };

  // Function to match doctor and patient in examination table
  const matchDoctorAndPatient = () => {
    if (selectedDoctor && selectedPatient) {
      Axios.post(`http://localhost:3003/matchdoctorandpatient`, {
        doctorId: selectedDoctor,
        patientId: selectedPatient,
      })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error('Error matching doctor and patient: ', error);
        });
    }
  };

  const columns = [
    { field: 'examination_ID', headerName: 'Examination ID', width: 150 },
    { field: 'paitent', headerName: 'Patient', width: 150 },
    { field: 'doctor', headerName: 'Doctor', width: 150 },
    { field: 'symptom', headerName: 'Symptom', width: 150 },
  ];

  return (
    <div>
      <input
        type="text"
        placeholder="Search Doctors"
        value={searchDoctorValue}
        onChange={(e) => setSearchDoctorValue(e.target.value)}
      />
            {doctors.map((doctor) => (
        <div key={doctor.doctor_ID}>
          <p>ID: {doctor.doctor_ID}</p>
          <p>Name: {doctor.name}</p>
          <p>Department: {doctor.dept}</p>
          <button onClick={() => setSelectedDoctor(doctor.doctor_ID)}>Select Doctor</button>
        </div>
      ))}
      <input
        type="text"
        placeholder="Search Patients"
        value={searchPatientValue}
        onChange={(e) => setSearchPatientValue(e.target.value)}
      />
      {patients.map((patient) => (
        <div key={patient.patient_ID}>
          <p>ID: {patient.patient_ID}</p>
          <p>Name: {patient.name}</p>
          <button onClick={() => setSelectedPatient(patient.patient_ID)}>Select Patient</button>
        </div>
      ))}
      <button onClick={matchDoctorAndPatient}>Match Doctor and Patient</button>
      <DataGrid rows={filteredRows} columns={columns} pageSize={5} />
    </div>
  );
};

export default Exam;