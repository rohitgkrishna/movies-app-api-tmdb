import React from 'react'

const Search = ({searchTerm,setSearchTerm}) => {
  return (
    <div className='search'>
        <div>
            <img src="./search.svg" alt="" />
            <input 
            placeholder='search 1000s of movies'
            type="text"
            value={searchTerm}
            onChange={(e)=>setSearchTerm(e.target.value)} />
        </div>
    </div>
  )
}

export default Search