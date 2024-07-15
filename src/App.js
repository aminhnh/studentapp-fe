import React from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StudentList from './components/StudentList';
import StudentEdit from './components/StudentEdit';
import StudentDetail from './components/StudentDetail';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route path='/students' exact={true} element={<StudentList/>}/>
        <Route path='/student/:id' element={<StudentEdit/>}/>
        <Route path='/student/details/:id' element={<StudentDetail/>}/>
      </Routes>
    </Router>
  )
}

export default App;