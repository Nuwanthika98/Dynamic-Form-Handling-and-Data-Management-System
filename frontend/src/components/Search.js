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
          if (response.data && response.data.data && response.data.data.length > 0) {
            setDeliveryData(response.data.data); 
            setNoDataMessage(""); 
          } else {
            setDeliveryData([]); 
            setNoDataMessage("No data on search!"); 
          }
          setPostalcode("");
          console.log("Search executed successfully:", response.data);
        })
        .catch((err) => {
          setDeliveryData([]); 
          setNoDataMessage("No data on search!"); 
          setPostalcode("");
          console.log(err);
        });
    }
  };

  const validate = (postalcode) => {
    const errors = {};
    const postalCodeRegex = /^\d{5}([,-]\d{5})?$/;

    if (!postalcode) {
      errors.postalcode = "Postal code is required!";
    } else if (!postalCodeRegex.test(postalcode)) {
      errors.postalcode = "Postal code must be in xxxxx or xxxxx-yyyyy format";
    }
    return errors;
  };

  return (
    <div>
      <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Search Delivery Thresholds
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-full">
                <label
                  htmlFor="postalcode"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  ZIP / Postal code
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="postalcode"
                    id="postalcode"
                    autoComplete="postalcode"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={postalcode}
                    onChange={handleChange}
                  />
                </div>
                <p>{formErrors.postalcode}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Search
          </button>
        </div>
      </form>
      {noDataMessage && <p className="text-red-500 mt-4">{noDataMessage}</p>}
      {deliveryData.length > 0 && (
        <div className="mt-4 p-4 border border-gray-300 rounded-md shadow-sm">
          <h3 className="text-lg font-semibold">Delivery Information</h3>
          {deliveryData.map((data, index) => (
            <div key={index} className="mt-2">
              <p>
                For <strong>{data.suburb || "N/A"}</strong> in <strong>{data.city || "N/A"}</strong>,{" "}
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
      <button
        type="button"
        className="rounded-md bg-indigo-600 px-10 py-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={() => {
          navigate("/");
        }}
      >
        Back
      </button>
    </div>
  );
};

export default Search;
