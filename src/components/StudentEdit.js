import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

const StudentEdit = () => {
  const initialFormState = {
    namaDepan: '',
    namaBelakang: '',
    tanggalLahir: ''
  };
  const [student, setStudent] = useState(initialFormState);
  const navigate = useNavigate();
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (id !== 'new') {
      fetch(`/api/student/${id}`)
        .then(response => response.json())
        .then(data => {
          if (data.tanggalLahir) {
            data.tanggalLahir = new Date(data.tanggalLahir).toISOString().split('T')[0];
          }
          setStudent(data);
          setIsEditing(true);
        });
    }
  }, [id, setStudent]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setStudent({ ...student, [name]: value });
  };

    const unformatId = (id) => {
      return id.replace(/\//g, '');
    };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const unformattedId = unformatId(student.id);

    const studentToSend = {
        ...student,
        id: unformattedId
    };
  await fetch(`/api/student${isEditing ? `/${unformattedId}` : ''}`, {
  method: isEditing ? 'PUT' : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(studentToSend)
    });
    setStudent(initialFormState);
    navigate('/students');
  };

  const title = <h2>{isEditing ? 'Edit Student' : 'Add Student'}</h2>;

  return (
    <div>
      <AppNavbar />
      <Container>
        {title}
        <Form onSubmit={handleSubmit}>
          <FormGroup className="mt-4">
            <Label for="name">Nomor Induk Mahasiswa</Label>
            <Input
              type="text"
              name="id"
              id="id"
              value={student.id || ''}
              onChange={handleChange}
              autoComplete="name"
              readOnly={isEditing}
            />
          </FormGroup>
          <FormGroup>
            <Label for="name">Nama Depan</Label>
            <Input
              type="text"
              name="namaDepan"
              id="namaDepan"
              value={student.namaDepan || ''}
              onChange={handleChange}
              autoComplete="name"
            />
          </FormGroup>
          <FormGroup>
            <Label for="name">Nama Belakang</Label>
            <Input
              type="text"
              name="namaBelakang"
              id="namaBelakang"
              value={student.namaBelakang || ''}
              onChange={handleChange}
              autoComplete="name"
            />
          </FormGroup>
          <FormGroup>
            <Label for="tanggalLahir">Tanggal Lahir</Label>
            <Input
              type="date"
              name="tanggalLahir"
              id="tanggalLahir"
              value={student.tanggalLahir || ''}
              onChange={handleChange}
              autoComplete="bday"
            />
          </FormGroup>
          <FormGroup className="mt-5">
            <Button color="primary" type="submit">
              Save
            </Button>{' '}
            <Button color="secondary" tag={Link} to="/students">
              Cancel
            </Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  );
};

export default StudentEdit;
