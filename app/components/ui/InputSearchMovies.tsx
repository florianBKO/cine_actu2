import { div } from 'motion/react-client'
import React from 'react'

function InputSearchMovies() {
  return (
    <div className='flex justify-center'><label className="input input-bordered flex items-center gap-2 w-1/2 mb-3">
  <input type="text" className="grow placeholder-primary text-primary font-bold" placeholder="Rechercher un Film " />
  <svg
  
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className="h-4 w-4 opacity-70 text-gray-800 ">
    <path
      fillRule="evenodd"
      d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
      clipRule="evenodd" />
  </svg>
</label>
</div>
  )
}

export default InputSearchMovies