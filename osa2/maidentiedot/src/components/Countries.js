import React from 'react';
import Weather from './Weather';

const Languages = ({languages}) =>{
  return(
    <ul>
      {
        languages.map(language => 
          <li key={language.name}>
            {language.name}
          </li>)
      }
    </ul>
  )
}

const Country = ({country}) =>{
  console.log(country.languages)
  return(
    <div>
      <h1>{country.name}</h1>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <h2>languages</h2>
      <Languages languages={country.languages} />
      <img src={country.flag} width="10%" />
    </div>
  )
}

const Countries = ({countries, clickHandle, weather}) =>{
  console.log(countries);
  console.log('in countries', weather);
  if(countries.length > 10){
    return(
      <div>too many matches, specify another filter</div>
    )
  }else if(countries.length === 1){
    return(
      <div>
        <Country country={countries[0]}></Country>
        <Weather weather={weather} />
      </div>
    )
  }else{
    return(
      <div>
      {countries.map(country => 
          <div key={country.name}>{country.name}<button onClick={() => clickHandle(country)}>show</button></div>
        )}
      </div>
    )
  }
}


export default Countries;