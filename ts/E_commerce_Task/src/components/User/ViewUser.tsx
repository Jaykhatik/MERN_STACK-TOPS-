import React from "react";
import { User } from "../../types/user";

// interface Address {
//   street: string;
// }

// interface User {
//   id: number;
//   username: string;
//   email: string;
//   phone: string;
//   address: Address;
// }

interface Props {
  selectedUser: User | null;
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>;
}

function ViewUser({ selectedUser, setSelectedUser }: Props) {
  if (!selectedUser) return null;

  return (
    <div className="view-container">
      <h2>User Details</h2>

      <p>UserName : {selectedUser.username}</p>
      <p>Email : {selectedUser.email}</p>
      <p>Phone : {selectedUser.phone}</p>
      <p>Street : {selectedUser?.address?.street}</p>

      <button onClick={() => setSelectedUser(null)}>Close</button>
    </div>
  );
}

export default ViewUser;