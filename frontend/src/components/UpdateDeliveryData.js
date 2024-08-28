import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UpdateDeliveryData = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [record, setRecord] = useState({
    state: "",
    addresses: [{ city: "", suburb: "", postalcode: "" }],
    deliverycost: "",
    pickupcost: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/form/${id}`
        );
        setRecord(response.data.data);
      } catch (error) {
        console.error("Error fetching record:", error);
      }
    };
    fetchRecord();
  }, [id]);

  const handleChange = (e, index) => {
    const { name, value } = e.target;

    if (name.startsWith("addresses")) {
      const addressIndex = parseInt(name.split(".")[1], 10);
      const fieldName = name.split(".")[2];

      setRecord((prevRecord) => {
        const updatedAddresses = [...prevRecord.addresses];
        updatedAddresses[addressIndex][fieldName] = value;
        return {
          ...prevRecord,
          addresses: updatedAddresses,
        };
      });
    } else {
      setRecord((prevRecord) => ({
        ...prevRecord,
        [name]: value,
      }));
    }
  };

  const validate = (values) => {
    const errors = {};
    const postalCodeRegex = /^\d{5}([,-]\d{5})?$/;

    if (!values.state) {
      errors.state = "State is required!";
    }
    values.addresses.forEach((address, index) => {
      if (!address.city) {
        errors[`addresses.${index}.city`] = "City is required!";
      }
      if (!address.suburb) {
        errors[`addresses.${index}.suburb`] = "Suburb is required!";
      }
      if (!address.postalcode) {
        errors[`addresses.${index}.postalcode`] = "Postalcode is required!";
      } else if (!postalCodeRegex.test(address.postalcode)) {
        errors[`addresses.${index}.postalcode`] =
          "Postal code must be in xxxxx, xxxxx-yyyy, or xxxxx,yyyyy format";
      }
    });
    if (!values.deliverycost) {
      errors.deliverycost = "Delivery cost is required!";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate(record);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setIsSubmit(true);
      const updatedRecord = { ...record, id };

      try {
        const response = await axios.put(
          "http://localhost:5000/api/form/update",
          updatedRecord
        );
        console.log("Update response:", response.data);
        if (response.data.status) {
          setUpdateSuccess(true);
        }
      } catch (error) {
        console.error("Error updating record:", error);
      }
    } else {
      setIsSubmit(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-10 px-4 py-6">
      <div className="w-full max-w-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Update Record</h1>
        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white p-6 rounded-lg shadow-md"
        >
          <div className="form-group">
            <input
              type="text"
              name="state"
              id="state"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={record.state}
              onChange={handleChange}
              placeholder="State"
            />
            {formErrors.state && (
              <p className="text-red-500 text-sm mt-1">{formErrors.state}</p>
            )}
          </div>

          {record.addresses.map((address, index) => (
            <div key={index} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <input
                  type="text"
                  name={`addresses.${index}.city`}
                  id={`addresses.${index}.city`}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={address.city}
                  onChange={(e) => handleChange(e, index)}
                  placeholder="City"
                />
                {formErrors[`addresses.${index}.city`] && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors[`addresses.${index}.city`]}
                  </p>
                )}

                <input
                  type="text"
                  name={`addresses.${index}.suburb`}
                  id={`addresses.${index}.suburb`}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={address.suburb}
                  onChange={(e) => handleChange(e, index)}
                  placeholder="Suburb"
                />
                {formErrors[`addresses.${index}.suburb`] && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors[`addresses.${index}.suburb`]}
                  </p>
                )}

                <input
                  type="text"
                  name={`addresses.${index}.postalcode`}
                  id={`addresses.${index}.postalcode`}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={address.postalcode}
                  onChange={(e) => handleChange(e, index)}
                  placeholder="Postal Code"
                />
                {formErrors[`addresses.${index}.postalcode`] && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors[`addresses.${index}.postalcode`]}
                  </p>
                )}
              </div>

              {record.addresses.length > 1 && (
                <button
                  type="button"
                  onClick={() =>
                    setRecord((prevRecord) => ({
                      ...prevRecord,
                      addresses: prevRecord.addresses.filter(
                        (_, i) => i !== index
                      ),
                    }))
                  }
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Remove
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={() =>
              setRecord((prevRecord) => ({
                ...prevRecord,
                addresses: [
                  ...prevRecord.addresses,
                  { city: "", suburb: "", postalcode: "" },
                ],
              }))
            }
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Add Another Address
          </button>

          <div className="form-group">
            <input
              type="text"
              name="deliverycost"
              id="deliverycost"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={record.deliverycost}
              onChange={handleChange}
              placeholder="Delivery Cost"
            />
            {formErrors.deliverycost && (
              <p className="text-red-500 text-sm mt-1">
                {formErrors.deliverycost}
              </p>
            )}
          </div>

          <div className="form-group">
            <input
              type="text"
              name="pickupcost"
              id="pickupcost"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={record.pickupcost}
              onChange={handleChange}
              placeholder="Pickup Cost"
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Save Changes
          </button>

          {updateSuccess && (
            <p className="text-green-500 text-sm mt-4">
              Record updated successfully!
            </p>
          )}
        </form>

        <button
          onClick={() => navigate("/alldata")}
          className="mt-4 px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
        >
          Back to All Data
        </button>
      </div>
    </div>
  );
};

export default UpdateDeliveryData;
