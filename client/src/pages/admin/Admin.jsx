import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Admin = () => {
  const navigate = useNavigate();

  const [projectsCount, setProjectsCount] = useState(0);
  const [completedProsCount, setCompletedProsCount] = useState(0);
  const [applicationsCount, setApplicationsCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      await fetchProjects();
      await fetchApplications();
      await fetchUsers();
    };

    fetchData();
  }, []); // Only run once

  const fetchProjects = async () => {
    try {
      const response = await axios.get("http://localhost:6001/fetch-projects");
      setProjectsCount(response.data.length);
      const completedProjects = response.data.filter(pro => pro.status === "Completed");
      setCompletedProsCount(completedProjects.length);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchApplications = async () => {
    try {
      const response = await axios.get("http://localhost:6001/fetch-applications");
      setApplicationsCount(response.data.length);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:6001/fetch-users");
      setUsersCount(response.data.length);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="admin-page">
      <h2>Admin Dashboard</h2>
      <div className="home-cards">

        <div className="home-card">
          <h4>All Projects</h4>
          <p>{projectsCount}</p>
          <button onClick={() => navigate('/admin-projects')}>View projects</button>
        </div>

        <div className="home-card">
          <h4>Completed Projects</h4>
          <p>{completedProsCount}</p>
          <button onClick={() => navigate('/admin-projects')}>View projects</button>
        </div>

        <div className="home-card">
          <h4>Applications</h4>
          <p>{applicationsCount}</p>
          <button onClick={() => navigate('/admin-applications')}>View Applications</button>
        </div>

        <div className="home-card">
          <h4>Users</h4>
          <p>{usersCount}</p>
          <button onClick={() => navigate('/all-users')}>View Users</button>
        </div>

      </div>
    </div>
  );
};

export default Admin;
