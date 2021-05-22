import React from 'react';


const Filter = ({handler}) =>{
    return(
      <div>
        filter shown with <input onChange={handler} />
      </div>
    )
  }
  


export default Filter;