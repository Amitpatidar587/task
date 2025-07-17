import React, { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [tab, setTab] = useState("email");
  const [data, setData] = useState([]);
  const [newData, setNewData] = useState({
    email: "",
    mobile: "",
    scenario: "",
    subject: "",
    message: "",
  });
  const [editId, setEditId] = useState(null);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/notification/");
      if (res.status === 200) {
        setData(res.data.data);
      }
    } catch (err) {
      alert("Some error occurred while fetching data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = async () => {
    if ((tab === "email" && !newData.email) || (tab === "mobile" && !newData.mobile)) {
      alert("Email or mobile field required");
      return;
    }

    try {
      if (editId) {
        const res = await axios.put(`http://127.0.0.1:8000/notification/${editId}/`, newData);
        if (res.status === 200) {
          alert("Data updated");
          setEditId(null);
          fetchData();
        }
      } else {
        const res = await axios.post("http://127.0.0.1:8000/notification/", newData);
        if (res.status === 200 || res.status === 201) {
          alert("Data added");
          fetchData();
        }
      }
      setNewData({ email: "", mobile: "", scenario: "", subject: "", message: "" });
    } catch (err) {
      alert("Some error occurred while saving data");
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://127.0.0.1:8000/notification/${id}/`);
      if (res.status === 200) {
        alert("Data deleted");
        fetchData();
      }
    } catch (err) {
      alert("Some error occurred while deleting data");
    }
  };

  const handleEdit = (item) => {
    setNewData(item);
    setEditId(item.id);
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="header flex gap-2 p-2">
          <button
            className="px-3 py-1 bg-blue-500 text-white rounded"
            onClick={() => setTab("email")}
          >
            Email
          </button>
          <button
            className="px-3 py-1 bg-blue-500 text-white rounded"
            onClick={() => setTab("mobile")}
          >
            Phone
          </button>
        </div>

        <div className="p-4 flex flex-col gap-3">
          {tab === "email" ? (
            <input
              className="p-2 border rounded"
              type="email"
              placeholder="Enter email"
              value={newData.email}
              onChange={(e) => setNewData({ ...newData, email: e.target.value })}
            />
          ) : (
            <input
              className="p-2 border rounded"
              type="tel"
              placeholder="Enter mobile"
              value={newData.mobile}
              onChange={(e) => setNewData({ ...newData, mobile: e.target.value })}
            />
          )}
          <select
            className="p-2 border rounded"
            value={newData.scenario}
            onChange={(e) => setNewData({ ...newData, scenario: e.target.value })}
          >
            <option value="">Select scenario</option>
            <option value="welcome">Welcome</option>
            <option value="reminder">Reminder</option>
            <option value="alert">Alert</option>
          </select>
          <input
            className="p-2 border rounded"
            type="text"
            placeholder="Enter subject"
            value={newData.subject}
            onChange={(e) => setNewData({ ...newData, subject: e.target.value })}
          />
          <input
            className="p-2 border rounded"
            type="text"
            placeholder="Enter message"
            value={newData.message}
            onChange={(e) => setNewData({ ...newData, message: e.target.value })}
          />
          <button
            className="w-24 p-2 bg-blue-500 text-white rounded"
            onClick={handleAdd}
          >
            {editId ? "Update" : "Submit"}
          </button>
        </div>
      </div>

      <div className="mt-6 p-4">
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Mobile</th>
              <th className="p-2 border">Scenario</th>
              <th className="p-2 border">Message</th>
              <th className="p-2 border">Subject</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item) => (
              <tr key={item.id}>
                <td className="p-2 border">{item.email || "N/A"}</td>
                <td className="p-2 border">{item.mobile || "N/A"}</td>
                <td className="p-2 border">{item.scenario || "N/A"}</td>
                <td className="p-2 border">{item.message || "N/A"}</td>
                <td className="p-2 border">{item.subject || "N/A"}</td>
                <td className="p-2 border flex gap-2">
                  <button
                    className="px-2 py-1 bg-red-500 text-white rounded"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="px-2 py-1 bg-green-500 text-white rounded"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td className="p-2 text-center" colSpan={6}>
                  No Data Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}