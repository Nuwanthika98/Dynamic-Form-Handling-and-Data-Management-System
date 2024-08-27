import React, { useState, useEffect } from "react";

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
        setIsSubmit(true)
    }

    useEffect(() => {
        console.log(formErrors)
        if (Object.keys(formErrors).length === 0 && isSubmit){
            console.log(formValues)
        }
    }, [formErrors])

    const validate = (values) => {
        const errors = {}
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
        }
        if (!values.deliverycost){
            errors.deliverycost = "Delivery cost is required!"
        }
        return errors
    }

  return (
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

            <div class="sm:col-span-full">
              <label
                for="postal-code"
                class="block text-sm font-medium leading-6 text-gray-900">
                ZIP / Postal code
              </label>
              <div class="mt-2">
                <input
                  type="text"
                  name="postal-code"
                  id="postal-code"
                  autocomplete="postal-code"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formValues.postalcode}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div class="sm:col-span-full">
              <label
                for="delivery-cost"
                class="block text-sm font-medium leading-6 text-gray-900">
                Delivery Cost
              </label>
              <div class="mt-2">
                <input
                  type="text"
                  name="delivery-cost"
                  id="delivery-cost"
                  autocomplete="delivery-cost"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formValues.deliverycost}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div class="sm:col-span-full">
              <label
                for="pickup-cost"
                class="block text-sm font-medium leading-6 text-gray-900">
                Pickup Cost
              </label>
              <div class="mt-2">
                <input
                  type="text"
                  name="pickup-cost"
                  id="pickup-cost"
                  autocomplete="pickup-cost"
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
          type="button"
          class="text-sm font-semibold leading-6 text-gray-900">
          Cancel
        </button>
        <button
          type="submit"
          class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  );
}
