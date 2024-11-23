import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const Holiday = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingItem, setEditingItem] = useState(null); // State for the item being edited
  const [formData, setFormData] = useState({ date: "", event: "" }); // Form state

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/holiday");
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle delete
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      axios
        .delete(`http://localhost:3000/api/holiday/delete/${id}`)
        .then(() => {
          setData((prevData) => prevData.filter((item) => item._id !== id));
        })
        .catch((err) => console.log(err));
    }
  };

  // Handle edit button click
  const handleEdit = (item) => {
    setEditingItem(item._id); // Set the editing ID
    setFormData({ date: item.date, event: item.event }); // Pre-fill form with existing data
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle update form submission
  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:3000/api/holiday/update/${editingItem}`, formData);
      setData((prevData) =>
        prevData.map((item) =>
          item._id === editingItem ? { ...item, ...formData } : item
        )
      );
      setEditingItem(null); // Clear editing state
      setFormData({ date: "", event: "" }); // Reset form
    } catch (err) {
      console.error(err);
    }
  };

  if (loading)
    return (
      <div className="text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="text-center">
        <p>Error: {error}</p>
        <button className="btn btn-primary" onClick={() => window.location.reload()}>
          Retry
        </button>
      </div>
    );

  return (
    <div className="container">
      <h1 className="text-center my-5">Date and Holiday</h1>
      <Link to='/holiday-admin'><button className="btn btn-primary">+Add Holiday</button></Link>
      <div className="d-flex text-center justify-content-center m-5">
        <table className="table table-striped">
       
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Event</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item._id}>
                <td className="px-3">{item.date}</td>
                <td className="px-3">{item.holiday}</td>
                <td>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-success mx-2"
                    onClick={() => handleEdit(item)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingItem && (
        <div className="d-flex justify-content-center my-5">
          <div className="card p-4 w-50">
            <h2>Edit Event</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdate();
              }}
            >
              <div className="mb-3">
                <label htmlFor="date" className="form-label">
                  Date
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="event" className="form-label">
                  Event
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="event"
                  name="event"
                  value={formData.event}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Save
              </button>
              <button
                type="button"
                className="btn btn-secondary mx-2"
                onClick={() => setEditingItem(null)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Holiday;
