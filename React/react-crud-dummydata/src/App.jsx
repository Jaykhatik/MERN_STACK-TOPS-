import React, { useEffect, useState } from 'react'
import { EmployeeData } from './Employeedata';

function App() {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [age, setAge] = useState(0);
  const [id, setId] = useState(0);
  const [isUpdate, setIsUpdate] = useState(false);

  //fetch data
  useEffect(() => {
    setData(EmployeeData);
  }, []);

  //edit
  const handleEdit = (id) => {
    const dt = data.filter(item => item.id === id)
    if (dt !== undefined) {
      setIsUpdate(true)
      setId(id);
      setName(dt[0].name);
      setLastname(dt[0].lastname);
      setAge(dt[0].age);
    }

  }

  //update
  const handleUpdate = () => {
    const index = data.map((item) => {
      return item.id
    }).indexOf(id)
    const dt = [...data];
    dt[index].name = name;
    dt[index].lastname = lastname;
    dt[index].age = age;

    setData(dt);
    handleClear();
  }

  //delete
  const handleDelete = (id) => {
    if (id > 0) {
      if (window.confirm("Are you sure you want to delete this data?")) {
        const dt = data.filter(item => item.id !== id);
        setData(dt);
      }
    }
  }

  //add
  const handleAdd = (e) => {
    let error = '';
    if (name === '')
      error += 'firstname is required, ';
    if (lastname === '')
      error += 'lastname is required, ';
    if (age <= 0)
      error += 'age is required.';

    if (error === '') {
      e.preventDefault();
      const dt = [...data];
      const newObj = {
        id: EmployeeData.length + 1,
        name: name,
        lastname: lastname,
        age: age
      }
      dt.push(newObj);
      setData(dt);
    }
    else {
      alert(error);
    }
  }


  //clear

  const handleClear = () => {
    setId(0);
    setName('');
    setLastname('');
    setAge(0);
    setIsUpdate(false)
  }




  return (
    <>
      <div style={{ display: "flex", marginBottom: "10px", marginTop: "20px", padding: "10px", justifyContent: "center", alignItems: "center" }}>
        <div>
          <label htmlFor="">Name : </label>
          <input type="text" onChange={(e) => setName(e.target.value)} value={name} />
        </div>
        <div>
          <label htmlFor="">Lastname : </label>
          <input type="text" onChange={(e) => setLastname(e.target.value)} value={lastname} />
        </div>
        <div>
          <label htmlFor="">Age : </label>
          <input type="text" onChange={(e) => setAge(e.target.value)} value={age} />
        </div>
        <div>
          {
            !isUpdate ?
              <button onClick={(e) => handleAdd(e)}>Add+</button>
              :
              <button  onClick={() => handleUpdate()}>Update</button>
          }

          <button onClick={() => handleClear()}>clear</button>
        </div>
      </div>
      <table className='custom-table'>
        <thead>
          <tr>
            <th>Sr.no</th>
            <th>Id</th>
            <th>Name</th>
            <th>Sirname</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.lastname}</td>
                  <td>{item.age}</td>
                  <td>
                    <button onClick={() => handleEdit(item.id)}>Edit</button>
                    <button onClick={() => handleDelete(item.id)}>Delete</button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </>
  )
}

export default App