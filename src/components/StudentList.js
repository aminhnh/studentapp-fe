import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

const StudentList = () => {

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetch('api/student')
      .then(response => response.json())
      .then(data => {
        setStudents(data);
        setLoading(false);
      })
  }, []);

  const confirmAndRemove = (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      remove(id);
    }
  };
  const remove = async (id) => {
    await fetch(`/api/student/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedStudents = [...students].filter(i => i.id !== id);
      setStudents(updatedStudents);
    });
  }

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };

  const formatId = (id) => {
    if (id.length !== 15) {
      return id;
    }
    return `${id.slice(0, 2)}/${id.slice(2, 8)}/${id.slice(8, 10)}/${id.slice(10)}`;
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  const studentList = students.map(student => {
    return <tr key={student.id}>
      <td style={{ whiteSpace: 'nowrap' }}>{formatId(student.id)}</td>
      <td style={{whiteSpace: 'nowrap'}}>{student.namaDepan + " "}{student.namaBelakang || ""}</td>
      <td style={{whiteSpace: 'nowrap'}}>{calculateAge(student.tanggalLahir)}</td>
      <td>
        <ButtonGroup>
            <Button size="sm" color="secondary" tag={Link} to={"/student/details/" + student.id}>Details</Button>
            <Button size="sm" color="primary" tag={Link} to={"/student/" + student.id}>Edit</Button>
            <Button size="sm" color="danger" onClick={() => confirmAndRemove(student.id)}>Delete</Button>
        </ButtonGroup>
      </td>
    </tr>
  });

  return (
    <div>
      <AppNavbar/>
      <Container fluid>
        <div className="float-end">
          <Button color="success" tag={Link} to="/student/new">Add Student</Button>
        </div>
        <h3>Student List</h3>
        <Table className="mt-4">
          <thead>
          <tr>
            <th width="20%">Nomor Induk Mahasiswa</th>
            <th width="20%">Nama Lengkap</th>
            <th width="20%">Umur</th>
            <th width="10%">Actions</th>
          </tr>
          </thead>
          <tbody>
          {studentList}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default StudentList;