import React, { useState, useEffect } from "react";
import axios from 'axios';

export default function AddDeliveryData() {
    const initialValues = {
        state: "",
        city: "",
        suburb: "",
        postalcode: "",
        deliverycost: "",
        pickupcost: ""
    }
    const [formValues, setFormValues] = useState(initialValues)
    const [formErrors, setFormErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)

    const handleChange = (e) => {
        console.log(e.target)
        const {name, value} = e.target
        setFormValues({...formValues, [name]: value})
        console.log(formValues)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setFormErrors(validate(formValues))
        console.log(formValues)
        axios.post('http://localhost:5000/api/form/create', formValues)
        .then((response) => {
          setIsSubmit(true)
          console.log(response, response.data)
          setFormValues(initialValues);
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
        console.log(formErrors)
        if (Object.keys(formErrors).length === 0 && isSubmit){
            console.log(formValues)
        }
    }, [formErrors])

    const validate = (values) => {
        const errors = {}
        const postalCodeRegex = /^\d{5}([,-]\d{5})?$/

        if (!values.state){
            errors.state = "State is required!"
        }
        if (!values.city){
            errors.city = "City is required!"
        }
        if (!values.suburb){
            errors.suburb = "Suburb is required!"
        }
        if (!values.postalcode){
            errors.postalcode = "Postalcode is required!"
        }else if (!postalCodeRegex.test(values.postalcode)) {
          errors.postalcode = "Postal code must be in xxxxx, xxxxx,yyyyy, or xxxxx-yyyyy format"
        }
        if (!values.deliverycost){
            errors.deliverycost = "Delivery cost is required!"
        }
        return errors
    }

  return (
    <div className="container">
      { Object.keys(formErrors).length === 0 && isSubmit ? (
        <div class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
        <span class="font-medium">Data added successfully!</span>
        </div> ) : (console.log('Error'))
      }
      <form class="max-w-lg mx-auto" onSubmit={handleSubmit}>
      <div class="space-y-12">
        <div class="border-b border-gray-900/10 pb-12">
          <h2 class="text-base font-semibold leading-7 text-gray-900">
            Add Delivery Thresholds
          </h2>

          <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div class="col-span-full">
              <label
                for="state"
                class="block text-sm font-medium leading-6 text-gray-900">
                State
              </label>
              <div class="mt-2">
                <input
                  type="text"
                  name="state"
                  id="state"
                  autocomplete="state"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={formValues.state}
                    onChange={handleChange}
                />
              </div>
            </div>
            <p>{formErrors.state}</p>

            <div class="sm:col-span-full sm:col-start-1">
              <label
                for="city"
                class="block text-sm font-medium leading-6 text-gray-900">
                City
              </label>
              <div class="mt-2">
                <input
                  type="text"
                  name="city"
                  id="city"
                  autocomplete="city"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formValues.city}
                  onChange={handleChange}
                />
              </div>
            </div>
            <p>{formErrors.city}</p>

            <div class="sm:col-span-full">
              <label
                for="suburb"
                class="block text-sm font-medium leading-6 text-gray-900">
                Suburb
              </label>
              <div class="mt-2">
                <input
                  type="text"
                  name="suburb"
                  id="suburb"
                  autocomplete="suburb"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formValues.suburb}
                  onChange={handleChange}
                />
              </div>
            </div>
            <p>{formErrors.suburb}</p>

            <div class="sm:col-span-full">
              <label
                for="postalcode"
                class="block text-sm font-medium leading-6 text-gray-900">
                ZIP / Postal code
              </label>
              <div class="mt-2">
                <input
                  type="text"
                  name="postalcode"
                  id="postalcode"
                  autocomplete="postalcode"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formValues.postalcode}
                  onChange={handleChange}
                />
              </div>
            </div>
            <p>{formErrors.postalcode}</p>

            <div class="sm:col-span-full">
              <label
                for="deliverycost"
                class="block text-sm font-medium leading-6 text-gray-900">
                Delivery Cost
              </label>
              <div class="mt-2">
                <input
                  type="text"
                  name="deliverycost"
                  id="deliverycost"
                  autocomplete="deliverycost"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formValues.deliverycost}
                  onChange={handleChange}
                />
              </div>
            </div>
            <p>{formErrors.deliverycost}</p>

            <div class="sm:col-span-full">
              <label
                for="pickupcost"
                class="block text-sm font-medium leading-6 text-gray-900">
                Pickup Cost
              </label>
              <div class="mt-2">
                <input
                  type="text"
                  name="pickupcost"
                  id="pickupcost"
                  autocomplete="pickupcost"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formValues.pickupcost}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="submit"
          class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
    </div>
    
  );
}
