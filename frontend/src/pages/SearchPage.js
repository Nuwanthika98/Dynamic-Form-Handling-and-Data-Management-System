import React from 'react'
import Search from '../components/Search'
import CustomButton from '../components/CustomButton'

const SearchPage = () => {
  return (
    <div>
      <Search />
      <div className="flex flex-col justify-center items-center mt-10 gap-6">
        <CustomButton text="Back" navigateTo="/" />
      </div>
    </div>
  )
}

export default SearchPage

