import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [postalcode, setPostalcode] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [deliveryData, setDeliveryData] = useState([]);
  const [noDataMessage, setNoDataMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setPostalcode(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate(postalcode);
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      axios
        .get(`http://localhost:5000/api/form/search/${postalcode}`)
        .then((response) => {
          const data = response.data.data || [];
          if (data.length > 0) {
            setDeliveryData(data);
            setNoDataMessage("");
          } else {
            setDeliveryData([]);
            setNoDataMessage("No data found for the given postal code.");
          }
          setPostalcode("");
        })
        .catch(() => {
          setDeliveryData([]);
          setNoDataMessage("Error occurred during search.");
          setPostalcode("");
        });
    }
  };

  const validate = (postalcode) => {
    const errors = {};
    const postalCodeRegex = /^\d{5}([,-]\d{5})?$/;

    if (!postalcode) {
      errors.postalcode = "Postal code is required!";
    } else if (!postalCodeRegex.test(postalcode)) {
      errors.postalcode = "Invalid postal code format";
    }
    return errors;
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">
        Search Delivery Thresholds
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="postalcode"
            className="block text-sm font-medium text-gray-700"
          >
            ZIP / Postal code
          </label>
          <input
            type="text"
            name="postalcode"
            id="postalcode"
            className="mt-1 block w-full border rounded-md py-2 px-3 text-gray-900"
            value={postalcode}
            onChange={handleChange}
          />
          {formErrors.postalcode && (
            <p className="text-red-500 text-sm mt-1">{formErrors.postalcode}</p>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Search
        </button>
      </form>
      {noDataMessage && <p className="text-red-500 mt-4">{noDataMessage}</p>}
      {deliveryData.length > 0 && (
        <div className="mt-4 p-4 border border-gray-300 rounded-md shadow-sm">
          <h3 className="text-lg font-semibold">Delivery Information</h3>
          {deliveryData.map((data, index) => (
            <div key={index} className="mt-2">
              <p>
                For <strong>{data.suburb || "N/A"}</strong> in{" "}
                <strong>{data.city || "N/A"}</strong>,{" "}
                <strong>{data.state || "N/A"}</strong>
              </p>
              <p>
                Delivery cost: <strong>{data.deliverycost || "N/A"}</strong>
              </p>
              <p>
                Pickup cost: <strong>{data.pickupcost || "N/A"}</strong>
              </p>
            </div>
          ))}
        </div>
      )}
      
    </div>
  );
};

export default Search;
