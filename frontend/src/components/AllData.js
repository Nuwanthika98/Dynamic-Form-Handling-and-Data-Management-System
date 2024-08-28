import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AllData = () => {
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(""); // Added state for success message

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/form/delete/${id}`);
      // Remove the deleted record from the state
      setRecords(records.filter(record => record._id !== id));
      setSuccessMessage("Data deleted successfully!"); // Set success message
    } catch (error) {
      console.error('Error deleting data:', error);
      setError(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/form/');
        const data = response.data.data;
        setRecords(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center mt-10">
      <button
        type="button"
        className="rounded-md bg-indigo-600 px-10 py-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={() => navigate("/")}
      >
        Back
      </button>
      <div>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {successMessage && (
          <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
            <span className="font-medium">{successMessage}</span>
          </div>
        )}
        <h1>All Records</h1>
        {records.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>State</th>
                <th>City</th>
                <th>Suburb</th>
                <th>Postal code</th>
                <th>Delivery cost</th>
                <th>Pickup cost</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => (
                <tr key={record._id}>
                  <td>{record.state}</td>
                  <td>{record.city}</td>
                  <td>{record.suburb}</td>
                  <td>{record.postalcode}</td>
                  <td>{record.deliverycost}</td>
                  <td>{record.pickupcost}</td>
                  <td>
                    <button
                      type="button"
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => navigate(`/update/${record._id}`)}
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleDelete(record._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {records.length === 0 && !isLoading && <p>No records found.</p>}
      </div>
    </div>
  );
};

export default AllData;
