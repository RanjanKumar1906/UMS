import { useEffect, useState } from "react";
import api from "../api/axios";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [message, setMessage] = useState("");

  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", { name, email, password, role });
      setMessage("User added successfully!");
      setName(""); setEmail(""); setPassword(""); setRole("student");
      fetchUsers();
    } catch (err) {
      setMessage(err.response?.data?.message || "Error adding user");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/users/${id}`);
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Manage Users</h2>
      {message && <p>{message}</p>}

      <div className="card">
        <form onSubmit={handleAddUser}>
          <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
          <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
          <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          <select value={role} onChange={e => setRole(e.target.value)}>
            <option value="student">Student</option>
            <option value="faculty">Faculty</option>
          </select>
          <button type="submit">Add User</button>
        </form>
      </div>

      <h3>Existing Users</h3>
      <div className="card">
      <table className="users-table">
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Role</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u._id}>
              <td data-label="Name">{u.name}</td>
              <td data-label="Email">{u.email}</td>
              <td data-label="Role">{u.role}</td>
              <td data-label="Action">
                <button onClick={() => handleDelete(u._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}