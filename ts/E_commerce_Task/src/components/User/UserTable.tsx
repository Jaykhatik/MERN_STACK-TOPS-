// import React from "react";
import { User } from "../../types/user";

// interface Address {
//   street: string;
// }

// interface User {
//   id: number;
//   username: string;
//   email: string;
//   phone: string;
//   address?: Address;
// }

interface Props {
  users: User[];
  setEditUser: (user: User) => void;
  handleDeleteUser: (id: number) => void;
  setSelectedUser: (user: User) => void;
}

function UserTable({
  users,
  setEditUser,
  handleDeleteUser,
  setSelectedUser,
}: Props) {
  return (
    <table className="user-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Street</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            <td>{user?.address?.street}</td>

            <td className="actions">
              <button
                onClick={() => setEditUser(user)}
                className="edit-btn"
              >
                Edit
              </button>

              <button
                onClick={() => handleDeleteUser(user.id)}
                className="delete-btn"
              >
                Delete
              </button>

              <button
                onClick={() => setSelectedUser(user)}
                className="view-btn"
              >
                View
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UserTable;