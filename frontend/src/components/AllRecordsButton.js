import React from 'react'
import {useNavigate} from 'react-router-dom'

const AllRecordsButton = () => {
    const navigate = useNavigate()

  return (
    <div className="flex justify-center items-center mt-10 gap-4">
    <button
      type="button"
      className="rounded-md bg-indigo-600 px-10 py-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      onClick={()=>{navigate("/alldata")}}
    >
      All Records
    </button>
    <button
      type="button"
      className="rounded-md bg-indigo-600 px-10 py-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      onClick={()=>{navigate("/search")}}
    >
      Search by Postalcode
    </button>
  </div>
  )
}

export default AllRecordsButton
