import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

function Read() {
  const [data, setData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios.get("http://localhost:5000/users/" + id)
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, [id]);

  return (
    <div className='w-100 d-flex vh-100 justify-content-center align-items-center bg-light'>
      <div className='bg-light border shadow px-5 pt-3 rounded pb-5 w-50'>
        <h3>Detail of user</h3>

        <div className="mb-2"><strong>Name: {data.name}</strong></div>
        <div className="mb-2"><strong>Email: {data.email}</strong></div>
        <div className="mb-2"><strong>Phone: {data.phone}</strong></div>
        <div className="mb-3"><strong>Website: {data.website}</strong></div>

        <Link to={`/update/${id}`} className='btn btn-success'>Edit</Link>
        <Link to='/' className='btn btn-danger ms-3'>Back</Link>
      </div>
    </div> 
  );
}

export default Read;
