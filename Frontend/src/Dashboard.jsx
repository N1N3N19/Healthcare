// Dashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/Dashboard');
        console.log(response.data.message);
        setDashboardData(response.data);
      } catch (error) {
        console.error('Unable to fetch dashboard data', error.response.data.message);
        // Redirect to the login page or perform other actions upon unauthorized access
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Doctor Dashboard</h2>
      {dashboardData && (
        <div>
          <p>{dashboardData.message}</p>
          {/* Display other dashboard data as needed */}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
