import React, { useEffect, useState } from 'react';
import '../styles/user.css';
import AddUserForm from '../components/User/addUserForm';
import EditUser from '../components/User/EditUser';
import ViewUser from '../components/User/ViewUser';
import UserTable from '../components/User/UserTable';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, deleteUser, fetchUsers, updateUser } from '../redux/features/userSlice';
import { getUsers } from '../services/UserServices';
import { RootState, AppDispatch } from '../redux/app/store';
import { User } from '../types/user';

// ✅ Form Values Type
interface UserFormValues {
  name: string;
  email: string;
  phone: string;
  street: string;
  city?: string;
  zipcode?: string;
}
function Users() {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading } = useSelector((state: RootState) => state.users);

  // const [users, setUsers] = useState([]);

  const [showForm, setShowForm] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
const [editUser, setEditUser] = useState<User | null>(null);

  const [uservalues, setuserValues] = useState<UserFormValues>({
    name: '',
    email: '',
    phone: '',
    street: '',
  });

  useEffect(() => {
    getUsers()
    dispatch(fetchUsers());
  }, [dispatch]);
  // console.log(users)

  const handleUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newUser: User = {
      id: Date.now(),
      username: uservalues.name,
      email: uservalues.email,
      phone: uservalues.phone,
      address: {
        city: uservalues.city,
        street: uservalues.street,
        zipcode: uservalues.zipcode
      }
    };

    dispatch(addUser(newUser));

    setuserValues({
      name: '',
      email: '',
      phone: '',
      street: '',
    });

    setShowForm(false);
  };


  const handleUpdateUser = () => {
    if (!editUser) return;
    dispatch(updateUser(editUser));
    setEditUser(null);
  };

  const handleDeleteUser = (id: number) => {
    if (!window.confirm("are you sure?")) return;
    dispatch(deleteUser(id));
  };

  if (loading) return <h2>Loading...</h2>;


  return (
    <div className="table-container">

      <div className="addButton" onClick={() => setShowForm(!showForm)}>
        +ADD
      </div>

      <AddUserForm
        showForm={showForm}
        handleUserSubmit={handleUserSubmit}
        uservalues={uservalues}
        setuserValues={setuserValues}
      />

      <EditUser
        editUser={editUser}
        setEditUser={setEditUser}
        handleUpdateUser={handleUpdateUser}
      />

      <ViewUser
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
      />

      <UserTable
        users={users}
        setEditUser={setEditUser}
        handleDeleteUser={handleDeleteUser}
        setSelectedUser={setSelectedUser}
      />

    </div>
  );
}

export default Users;