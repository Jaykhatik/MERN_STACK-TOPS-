import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';


function Home() {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        axios.get("http://localhost:5000/users")
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    }, []);


    ///delete


    const handleDelete = (id) => {
        const confirm = window.confirm("delte or not?");
        if (confirm) {
            axios.delete("http://localhost:5000/users/" + id)
                .then(res => { location.reload() })
                .catch(err => console.log(err));
        }
    }

    return (
        <>
            <div className='container d-flex flex-column justify-content-center align-items-center bg-light vh-100'>
                <h1 className='bg-dark text-light p-2 rounded-3 mt-4 mb-4 w-100 text-center'>List of users</h1>
                <div className='w-75 rounded bg-white border shadow p-4'>
                    <div className='d-flex justify-content-end'>
                        <Link to="/create" className='btn btn-success'> ADD+</Link>
                    </div>
                    <table className='table table-striped'>
                        <thead>
                            <tr className='bg-dark text-white me-2'>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>EMAIL</th>
                                <th>PHONE</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((d, i) => (
                                    <tr key={i}>
                                        <td>{d.id}</td>
                                        <td>{d.name}</td>
                                        <td>{d.email}</td>
                                        <td>{d.phone}</td>
                                        <td>
                                            <Link to={`/read/${d.id}`} className='btn btn-primary btn-sm me-2'>Read</Link>
                                            <Link to={`/update/${d.id}`} className='btn btn-secondary btn-sm ms-2 me-2'>Edit</Link>
                                            <button onClick={e => handleDelete(d.id)} className='btn btn-sm btn-danger me-2'>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>

                </div>
            </div>
        </>
    )
}

export default Home