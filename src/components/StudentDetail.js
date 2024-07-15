import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';

const StudentDetail = () => {
    const [student, setStudent] = useState(null);
    const { id } = useParams();

    useEffect(() => {
    fetch(`/api/student/${id}`)
      .then(response => response.json())
      .then(data => setStudent(data));
    }, [id]);

    const formatId = (id) => {
      if (id.length !== 15) {
        return id;
      }
      return `${id.slice(0, 2)}/${id.slice(2, 8)}/${id.slice(8, 10)}/${id.slice(10)}`;
    };

    if (!student) {
    return <p>Loading...</p>;
    }

    return (
        <div>
              <AppNavbar />
              <Container>
                <h2>Student Details</h2>
                <Table className="mt-3">
                  <tbody>
                    <tr>
                      <th width="20%">Nomor Induk Mahasiswa</th>
                      <td>{formatId(student.id)}</td>
                    </tr>
                    <tr>
                      <th>Nama Depan</th>
                      <td>{student.namaDepan}</td>
                    </tr>
                    <tr>
                      <th>Nama Belakang</th>
                      <td>{student.namaBelakang}</td>
                    </tr>
                    <tr>
                      <th>Tanggal Lahir</th>
                      <td>{new Date(student.tanggalLahir).toLocaleDateString()}</td>
                    </tr>
                  </tbody>
                </Table>
                <Button color="primary" tag={Link} to="/students" className="mt-3">Back</Button>
              </Container>
        </div>
    );
};

export default StudentDetail;
