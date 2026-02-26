import { useEffect, useState } from "react";
import api from "../api/axios";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [rollNo, setRollNo] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

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
      const payload = { name, email, password, role };
      if (role === "student") {
        payload.rollNo = rollNo;
        payload.department = department;
        payload.year = Number(year);
      }

      await api.post("/auth/register", payload);
      setMessage("User added successfully!");
      setMessageType("success");
      setName(""); setEmail(""); setPassword(""); setRole("student");
      setRollNo(""); setDepartment(""); setYear("");
      fetchUsers();
    } catch (err) {
      setMessage(err.response?.data?.message || "Error adding user");
      setMessageType("error");
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
    <div className="section-wrap">
      <h2 className="section-title">Manage Users</h2>
      {message && <p className={`alert ${messageType}`}>{message}</p>}

      <div className="card section-card">
        <form className="grid-form" onSubmit={handleAddUser}>
          <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
          <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
          <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          <select value={role} onChange={e => setRole(e.target.value)}>
            <option value="student">Student</option>
            <option value="faculty">Faculty</option>
          </select>
          {role === "student" && (
            <>
              <input
                placeholder="Roll Number"
                value={rollNo}
                onChange={e => setRollNo(e.target.value)}
                required
              />
              <input
                placeholder="Department"
                value={department}
                onChange={e => setDepartment(e.target.value)}
                required
              />
              <input
                type="number"
                placeholder="Year"
                min="1"
                max="8"
                value={year}
                onChange={e => setYear(e.target.value)}
                required
              />
            </>
          )}
          <button className="btn-primary" type="submit">Add User</button>
        </form>
      </div>

      <h3 className="subheading">Existing Users</h3>
      <div className="card section-card">
      <table className="users-table">
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Role</th><th>Features</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u._id}>
              <td data-label="Name">{u.name}</td>
              <td data-label="Email">{u.email}</td>
              <td data-label="Role">{u.role}</td>
              <td data-label="Features">{Array.isArray(u.features) ? u.features.length : 0}</td>
              <td data-label="Action">
                <button className="btn-danger" onClick={() => handleDelete(u._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}
