import React from 'react'

const Filter = ({filterExp, handleFilterChange}) => {
    return (
        <div>
            filter shown with <input value={filterExp} onChange={handleFilterChange}/>
        </div>
    )
}

export default Filter