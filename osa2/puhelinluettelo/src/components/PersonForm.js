import React from 'react';

const PersonForm = ({nameHandler, numberHandler, clickHandler}) =>{
    return(
      <div>
        <form>
          <div>name: <input onChange={nameHandler} /></div>
          <div>number: <input onChange={numberHandler} /></div>
          <div><button type="submit" onClick={clickHandler}>add</button></div>
        </form>
      </div>
    )
  }



export default PersonForm;