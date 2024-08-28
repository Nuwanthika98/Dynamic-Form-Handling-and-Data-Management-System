import React, { useState } from 'react';
import { useForm, useFieldArray } from "react-hook-form";
import axios from 'axios';

const AddDeliveryData = () => {
  const [successMessage, setSuccessMessage] = useState("");

  const { register, handleSubmit, control, reset, formState: { errors } } = useForm({
    defaultValues: {
      state: "", 
      addresses: [{ city: "", suburb: "", postalcode: "" }],
      deliverycost: "", 
      pickupcost: "" 
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "addresses",
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:5000/api/form/create', data);
      console.log(response.data);
      reset();
      setSuccessMessage("Data saved successfully!");
    } catch (error) {
      console.error('There was an error submitting the form:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Add a Record</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* State Input */}
        <div className="form-group">
          <input
            {...register("state", { required: "State is required" })}
            placeholder="State"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>}
        </div>

        {/* Dynamic Address Fields */}
        {fields.map((field, index) => (
          <div key={field.id} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <input
                {...register(`addresses.${index}.city`, { required: "City is required" })}
                placeholder="City"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.addresses?.[index]?.city && <p className="text-red-500 text-sm mt-1">{errors.addresses[index].city.message}</p>}

              <input
                {...register(`addresses.${index}.suburb`, { required: "Suburb is required" })}
                placeholder="Suburb"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.addresses?.[index]?.suburb && <p className="text-red-500 text-sm mt-1">{errors.addresses[index].suburb.message}</p>}

              <input
                {...register(`addresses.${index}.postalcode`, {
                  required: "Postal Code is required",
                  pattern: {
                    value: /^\d{5}([,-]\d{5})?$/,
                    message: "Postal code must be in xxxxx, xxxxx-yyyy or xxxxx,yyyyy format"
                  }
                })}
                placeholder="Postal Code"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.addresses?.[index]?.postalcode && <p className="text-red-500 text-sm mt-1">{errors.addresses[index].postalcode.message}</p>}
            </div>

            {/* Button to remove this address field */}
            {fields.length > 1 && (
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Remove
              </button>
            )}
          </div>
        ))}

        {/* Button to add a new address field */}
        <button
          type="button"
          onClick={() => append({ city: "", suburb: "", postalcode: "" })}
          className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Add Another Address
        </button>

        {/* Delivery Cost Input */}
        <div className="form-group">
          <input
            {...register("deliverycost", { required: "Delivery Cost is required" })}
            placeholder="Delivery Cost"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.deliverycost && <p className="text-red-500 text-sm mt-1">{errors.deliverycost.message}</p>}
        </div>

        {/* Pickup Cost Input */}
        <div className="form-group">
          <input
            {...register("pickupcost")}
            placeholder="Pickup Cost"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.pickupcost && <p className="text-red-500 text-sm mt-1">{errors.pickupcost.message}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </button>
        {/* Success Message */}
        {successMessage && (
                <p className="text-green-500 text-sm mt-4">{successMessage}</p>
            )}
      </form>
    </div>
  );
}

export default AddDeliveryData;
