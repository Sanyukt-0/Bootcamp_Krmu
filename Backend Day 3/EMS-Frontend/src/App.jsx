import { useEffect, useState } from "react";

function App() {
  const [employees, setEmployees] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    department: "",
    salary: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("");

  const API_URL = "http://localhost:3000/employees";

  // FETCH EMPLOYEES
  const getEmployees = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    setEmployees(data);
  };

  useEffect(() => {
    getEmployees();
  }, []);

  // HANDLE INPUT
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ADD EMPLOYEE
  const addEmployee = async (e) => {
    e.preventDefault();

    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    setFormData({
      name: "",
      department: "",
      salary: "",
    });

    getEmployees();
  };

  // EDIT BUTTON CLICK
  const editEmployee = (employee) => {
    setEditingId(employee.id);

    setFormData({
      name: employee.name,
      department: employee.department,
      salary: employee.salary,
    });
  };

  // UPDATE EMPLOYEE
  const updateEmployee = async (e) => {
    e.preventDefault();

    await fetch(`${API_URL}/${editingId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    setEditingId(null);

    setFormData({
      name: "",
      department: "",
      salary: "",
    });

    getEmployees();
  };

  // DELETE EMPLOYEE
  const deleteEmployee = async (id) => {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    getEmployees();
  };

  // SEARCH + FILTER
  const filteredEmployees = employees
    .filter((employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((employee) =>
      filterDepartment
        ? employee.department === filterDepartment
        : true
    );

  return (
    <div className="container">
      <h1>Employee Management System</h1>

      <h2>Total Employees: {filteredEmployees.length}</h2>

      {/* FORM */}
      <form
        onSubmit={editingId ? updateEmployee : addEmployee}
        className="form"
      >
        <input
          type="text"
          name="name"
          placeholder="Employee Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="department"
          placeholder="Department"
          value={formData.department}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="salary"
          placeholder="Salary"
          value={formData.salary}
          onChange={handleChange}
          required
        />

        <button type="submit">
          {editingId ? "Update Employee" : "Add Employee"}
        </button>
      </form>

      {/* SEARCH + FILTER */}
<div className="controls">
  <input
    type="text"
    placeholder="🔍 Search Employee..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />

  <select
    value={filterDepartment}
    onChange={(e) => setFilterDepartment(e.target.value)}
  >
    <option value="">All Departments</option>
    <option value="HR">HR</option>
    <option value="IT">IT</option>
    <option value="Finance">Finance</option>
    <option value="Marketing">Marketing</option>
  </select>
</div>

      {/* EMPLOYEE CARDS */}
      <div className="employee-grid">
        {filteredEmployees.map((employee) => (
          <div key={employee.id} className="card">
            <h3>{employee.name}</h3>

            <p>Department: {employee.department}</p>

            <p>Salary: ₹{employee.salary}</p>

            <button
              onClick={() => editEmployee(employee)}
              style={{ marginRight: "10px" }}
            >
              Edit
            </button>

            <button
              className="delete-btn"
              onClick={() => deleteEmployee(employee.id)}
            >
              Delete
            </button>
          </div>
          
        ))}
      </div>
    </div>
  );
}

export default App;