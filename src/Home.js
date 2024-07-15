import React from 'react';
import './App.css';
import AppNavbar from './components/AppNavbar';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';

const Home = () => {
  return (
    <div>
      <AppNavbar/>
      <Container fluid>
      <h1>Welcome to the Student Management App!</h1>
        <p>This application allows you to perform CRUD (Create, Read, Update, Delete) operations on student data. You can add new students, view their details, edit their information, or remove them from the system.</p>
        <p className="lead">
          <Button color="primary" tag={Link} to="/students">Manage Student Data</Button>
        </p>
      </Container>
    </div>
  );
}

export default Home;