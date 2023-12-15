import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Axios from 'axios';
import { FaBan } from 'react-icons/fa';

export default function Doctor() {
  const [rows, setRows] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    Axios.get('http://localhost:3003/getdoctor')
      .then((response) => {
        console.log(response.data); // Log the response data
        setRows(response.data.map((doctor) => ({ id: doctor.doctor_ID, ...doctor })));
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  const deleteRow = (doctor_ID) => {
    Axios.delete(`http://localhost:3003/doctor/${doctor_ID}`)
      .then(() => {
        setRows((prevRows) => prevRows.filter((row) => row.doctor_ID !== doctor_ID));
      })
      .catch((error) => {
        console.error(`There was an error deleting the doctor: ${error}`);
      });
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const filteredRows = rows.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(searchValue.toLowerCase())
    )
  );

  const columns = [
    { field: 'doctor_ID', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Name', width: 400 },
    { field: 'dept', headerName: 'Department', width: 200 },
    {
      field: 'delete',
      headerName: '',
      sortable: false,
      width: 50,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        const onClick = () => {
          const idToDelete = params.row.doctor_ID;
          deleteRow(idToDelete);
        };
        return <FaBan onClick={onClick} />;
      },
    },
  ];

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <input
        type="text"
        placeholder="Search..."
        value={searchValue}
        onChange={handleSearchChange}
        style={{ marginBottom: '10px', padding: '5px' }}
      />
      <DataGrid rows={filteredRows} columns={columns} pageSize={10} />
    </div>
  );
}
