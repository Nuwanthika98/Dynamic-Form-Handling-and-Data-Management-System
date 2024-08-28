import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateDeliveryData = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  
  const [record, setRecord] = useState({
    state: '',
    city: '',
    suburb: '',
    postalcode: '',
    deliverycost: '',
    pickupcost: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/form/${id}`);
        setRecord(response.data.data); 
      } catch (error) {
        console.error('Error fetching record:', error);
      }
    };
    fetchRecord();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecord(prevRecord => ({
      ...prevRecord,
      [name]: value
    }));
  };

  const validate = (values) => {
    const errors = {};
    const postalCodeRegex = /^\d{5}([,-]\d{5})?$/;

    if (!values.state) {
      errors.state = "State is required!";
    }
    if (!values.city) {
      errors.city = "City is required!";
    }
    if (!values.suburb) {
      errors.suburb = "Suburb is required!";
    }
    if (!values.postalcode) {
      errors.postalcode = "Postalcode is required!";
    } else if (!postalCodeRegex.test(values.postalcode)) {
      errors.postalcode = "Postal code must be in xxxxx, xxxxx, yyyy, or xxxxx-yyyyy format";
    }
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
        const response = await axios.put('http://localhost:5000/api/form/update', updatedRecord);
        console.log('Update response:', response.data); 
        if (response.data.status) {
          setUpdateSuccess(true);  
        }
      } catch (error) {
        console.error('Error updating record:', error);
      }
    } else {
      setIsSubmit(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-10">
      <h1>Update Record</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-full">
                <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">
                  State
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="state"
                    id="state"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={record.state}
                    onChange={handleChange}
                  />
                </div>
                {formErrors.state && <p className="text-red-500">{formErrors.state}</p>}
              </div>
              <div className="sm:col-span-full">
                <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                  City
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="city"
                    id="city"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={record.city}
                    onChange={handleChange}
                  />
                </div>
                {formErrors.city && <p className="text-red-500">{formErrors.city}</p>}
              </div>
              <div className="sm:col-span-full">
                <label htmlFor="suburb" className="block text-sm font-medium leading-6 text-gray-900">
                  Suburb
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="suburb"
                    id="suburb"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={record.suburb}
                    onChange={handleChange}
                  />
                </div>
                {formErrors.suburb && <p className="text-red-500">{formErrors.suburb}</p>}
              </div>
              <div className="sm:col-span-full">
                <label htmlFor="postalcode" className="block text-sm font-medium leading-6 text-gray-900">
                  Postal Code
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="postalcode"
                    id="postalcode"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={record.postalcode}
                    onChange={handleChange}
                  />
                  {formErrors.postalcode && <p className="text-red-500">{formErrors.postalcode}</p>}
                </div>
              </div>
              <div className="sm:col-span-full">
                <label htmlFor="deliverycost" className="block text-sm font-medium leading-6 text-gray-900">
                  Delivery Cost
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="deliverycost"
                    id="deliverycost"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={record.deliverycost}
                    onChange={handleChange}
                  />
                </div>
                {formErrors.deliverycost && <p className="text-red-500">{formErrors.deliverycost}</p>}
              </div>
              <div className="sm:col-span-full">
                <label htmlFor="pickupcost" className="block text-sm font-medium leading-6 text-gray-900">
                  Pickup Cost
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="pickupcost"
                    id="pickupcost"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={record.pickupcost}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Update
          </button>
        </div>
        {updateSuccess && <p className="text-green-500">Record updated successfully!</p>}
      </form>
      <button
        type="button"
        className="rounded-md bg-indigo-600 px-10 py-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={() => {
          navigate("/alldata");
        }}
      >
        Back
      </button>
    </div>
  );
};

export default UpdateDeliveryData;
