import React from 'react';

const Filter = ({handleFilterChange, value}) => {
    return (
    <div>
        filter shown with: <input onChange={handleFilterChange} value={value}/>
    </div>
    );
};

export default Filter;